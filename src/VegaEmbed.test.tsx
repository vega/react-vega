import React from "react";
import { cleanup, render } from "vitest-browser-react";
import { describe, it, afterEach, expect, vi } from "vitest";
import { act, waitFor } from "@testing-library/react";
import { VegaEmbed } from "./VegaEmbed";
import embed, { EmbedOptions } from "vega-embed";

vi.mock("vega-embed", () => {
  return { default: vi.fn() }; // mark as ESM + provide default
});

const mkResult = (finalize: () => void = vi.fn()) => ({ finalize });

describe("VegaEmbed", () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it("renders without crashing", async () => {
    const { unmount } = render(<VegaEmbed spec="x" />);
    await waitFor(() => expect(embed).toHaveBeenCalledTimes(1));
    unmount();
  });

  it("finalizes the view on unmount", async () => {
    const finalize = vi.fn();
    vi.mocked(embed).mockResolvedValueOnce(mkResult(finalize) as any);
    const { unmount } = render(<VegaEmbed spec="s" />);
    unmount();
    await waitFor(() => expect(finalize).toHaveBeenCalledTimes(1));
  });

  it("finalizes the previous view when `spec` changes", async () => {
    const finalizeA = vi.fn();
    const finalizeB = vi.fn();

    vi.mocked(embed)
      .mockResolvedValueOnce(mkResult(finalizeA) as any)
      .mockResolvedValueOnce(mkResult(finalizeB) as any);

    const { rerender } = render(<VegaEmbed spec="A" />);

    rerender(<VegaEmbed spec="B" />);

    await waitFor(() => {
      expect(finalizeA).toHaveBeenCalledTimes(1);
      expect(embed).toHaveBeenCalledTimes(2);
    });
  });

  it("finalizes the previous view when `options` changes", async () => {
    const finalizeA = vi.fn();
    const finalizeB = vi.fn();

    vi.mocked(embed)
      .mockResolvedValueOnce(mkResult(finalizeA) as any)
      .mockResolvedValueOnce(mkResult(finalizeB) as any);

    const { rerender } = render(
      <VegaEmbed spec="A" options={{ width: 400 }} />,
    );

    rerender(<VegaEmbed spec="A" options={{ width: 420 }} />);

    await waitFor(() => {
      expect(finalizeA).toHaveBeenCalledTimes(1);
      expect(embed).toHaveBeenCalledTimes(2);
    });
  });

  it("does not re-embed when `options` is deep-equal but new by reference", async () => {
    const finalize = vi.fn();
    vi.mocked(embed).mockResolvedValue(mkResult(finalize) as any);

    const opts1: EmbedOptions = { renderer: "svg" };
    const { rerender } = render(<VegaEmbed spec="X" options={opts1} />);

    const opts2: EmbedOptions = { renderer: "svg" };
    rerender(<VegaEmbed spec="X" options={opts2} />);

    await waitFor(() => expect(embed).toHaveBeenCalledTimes(1));
  });

  it("re-embeds when a deep field inside `options` changes", async () => {
    const finalizeA = vi.fn();
    const finalizeB = vi.fn();
    vi.mocked(embed)
      .mockResolvedValueOnce(mkResult(finalizeA) as any)
      .mockResolvedValueOnce(mkResult(finalizeA) as any)
      .mockResolvedValueOnce(mkResult(finalizeB) as any);

    const { rerender } = render(
      <VegaEmbed spec="X" options={{ config: { autosize: "pad" } }} />,
    );

    rerender(<VegaEmbed spec="X" options={{ config: { autosize: "fit" } }} />);

    await waitFor(() => {
      expect(embed).toHaveBeenCalledTimes(2);
      expect(finalizeA).toHaveBeenCalled();
    });
  });

  it("cancels a stale embed and finalizes the old view", async () => {
    const finalize = vi.fn();

    vi.mocked(embed)
      .mockResolvedValueOnce(mkResult(finalize) as any)
      .mockResolvedValueOnce(mkResult() as any);

    const { rerender } = render(<VegaEmbed spec="A" />);

    rerender(<VegaEmbed spec="B" />);

    await waitFor(() => {
      expect(embed).toHaveBeenCalledTimes(2);
      expect(finalize).toHaveBeenCalledTimes(1);
    });
  });

  it("calls `onEmbed` with the same Result and never calls `onError`", async () => {
    const result = mkResult();

    vi.mocked(embed).mockResolvedValueOnce(result as any);

    const onEmbed = vi.fn();
    const onError = vi.fn();

    render(<VegaEmbed spec="X" onEmbed={onEmbed} onError={onError} />);

    await waitFor(() => {
      expect(onEmbed).toHaveBeenCalledExactlyOnceWith(result);
      expect(onError).not.toHaveBeenCalled();
    });
  });

  it("calls `onError` when embed rejects", async () => {
    const err = new Error("boom");
    vi.mocked(embed).mockRejectedValueOnce(err);

    const onError = vi.fn();
    const onEmbed = vi.fn();

    render(<VegaEmbed spec="bad" onEmbed={onEmbed} onError={onError} />);

    // Let React flush the rejected promise/effects
    await act(async () => {});

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(err);
      expect(onEmbed).not.toHaveBeenCalled();
    });

    stop();
  });

  it("exposes the underlying <div> through the forwarded ref", async () => {
    vi.mocked(embed).mockResolvedValueOnce(mkResult() as any);

    const ref = React.createRef<HTMLDivElement>();
    render(<VegaEmbed ref={ref} spec="y" />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards additional props to the rendered div", async () => {
    vi.mocked(embed).mockResolvedValueOnce(mkResult() as any);

    const { getByTestId } = render(
      <VegaEmbed
        spec="z"
        className="foo"
        data-testid="vega"
        aria-label="chart"
      />,
    );

    const div = getByTestId("vega");
    expect(div).toHaveClass("foo");
    expect(div).toHaveAttribute("aria-label", "chart");
  });

  it("catches errors in `onEmbed`", async () => {
    const result = mkResult();
    const err = new Error("boom");
    vi.mocked(embed).mockResolvedValueOnce(result as any);

    vi.spyOn(console, "error").mockImplementation(() => {});

    const onEmbed = vi.fn().mockImplementation((result) => {
      throw err;
    });

    const onError = vi.fn();

    render(<VegaEmbed spec="A" onEmbed={onEmbed} onError={onError} />);

    await waitFor(() => {
      expect(onEmbed).toHaveBeenCalledOnce();
      expect(onError).toHaveBeenCalledWith(err);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });
});
