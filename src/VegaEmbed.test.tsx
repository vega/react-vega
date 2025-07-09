import React from "react";
import { render, act, cleanup } from "@testing-library/react";
import { VegaEmbed } from "./VegaEmbed";
import embed, { EmbedOptions } from "vega-embed";
import { setImmediate } from "timers";
import "@testing-library/jest-dom";

jest.mock("vega-embed", () => jest.fn());

const flushPromises = () => new Promise(setImmediate);

type MockFinalize = jest.Mock<void, []>;
type MockResult = { finalize: MockFinalize };

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mkResult = (finalize: MockFinalize = jest.fn()): MockResult =>
  ({ finalize } as unknown as MockResult);

describe("VegaEmbed", () => {
  it("renders without crashing", async () => {
    const { unmount } = render(<VegaEmbed spec="x" />);
    await act(flushPromises);
    unmount();
    expect(embed).toHaveBeenCalledTimes(1);
  });

  it("finalizes the view on unmount", async () => {
    const finalize = jest.fn();
    (embed as jest.Mock).mockResolvedValueOnce(mkResult(finalize));

    const { unmount } = render(<VegaEmbed spec="s" />);
    await act(async () => {
      await flushPromises();
      unmount();
    });

    expect(finalize).toHaveBeenCalledTimes(1);
  });

  it("finalizes the previous view when `spec` changes", async () => {
    const finalizeA = jest.fn();
    const finalizeB = jest.fn();

    (embed as jest.Mock)
      .mockResolvedValueOnce(mkResult(finalizeA))
      .mockResolvedValueOnce(mkResult(finalizeB));

    const { rerender } = render(<VegaEmbed spec="A" />);
    await act(flushPromises);

    rerender(<VegaEmbed spec="B" />);
    await act(flushPromises);

    expect(finalizeA).toHaveBeenCalledTimes(1);
    expect(embed).toHaveBeenCalledTimes(2);
  });

  it("finalizes the previous view when `options` changes", async () => {
    const finalizeA = jest.fn();
    const finalizeB = jest.fn();

    (embed as jest.Mock)
      .mockResolvedValueOnce(mkResult(finalizeA))
      .mockResolvedValueOnce(mkResult(finalizeB));

    const { rerender } = render(
      <VegaEmbed spec="A" options={{ width: 400 }} />
    );
    await act(flushPromises);

    rerender(<VegaEmbed spec="A" options={{ width: 420 }} />);
    await act(flushPromises);

    expect(finalizeA).toHaveBeenCalledTimes(1);
    expect(embed).toHaveBeenCalledTimes(2);
  });

  it("does not re-embed when `options` is deep-equal but new by reference", async () => {
    const finalize = jest.fn();
    (embed as jest.Mock).mockResolvedValue(mkResult(finalize));

    const opts1: EmbedOptions = { renderer: "svg" };
    const { rerender } = render(<VegaEmbed spec="X" options={opts1} />);
    await act(flushPromises);

    const opts2: EmbedOptions = { renderer: "svg" };
    rerender(<VegaEmbed spec="X" options={opts2} />);
    await act(flushPromises);

    expect(embed).toHaveBeenCalledTimes(1);
  });

  it("re-embeds when a deep field inside `options` changes", async () => {
    const finalizeA = jest.fn();
    const finalizeB = jest.fn();
    (embed as jest.Mock)
      .mockResolvedValueOnce(mkResult(finalizeA))
      .mockResolvedValueOnce(mkResult(finalizeB));

    const { rerender } = render(
      <VegaEmbed spec="X" options={{ config: { autosize: "pad" } }} />
    );
    await act(flushPromises);

    rerender(<VegaEmbed spec="X" options={{ config: { autosize: "fit" } }} />);
    await act(flushPromises);

    expect(embed).toHaveBeenCalledTimes(2);
    expect(finalizeA).toHaveBeenCalled();
  });

  it("cancels a stale embed and finalizes the old view", async () => {
    let resolveA: (v: unknown) => void;
    const finalizeA = jest.fn();
    const finalizeB = jest.fn();
    const resultA = mkResult(finalizeA);
    const resultB = mkResult(finalizeB);

    (embed as jest.Mock)
      // First call stalls until we manually resolve
      .mockImplementationOnce(
        () =>
          new Promise((res) => {
            resolveA = res;
          })
      )
      // Second call resolves immediately
      .mockResolvedValueOnce(resultB);

    const { rerender } = render(<VegaEmbed spec="A" />);
    // Change spec before first promise resolves
    rerender(<VegaEmbed spec="B" />);
    await act(flushPromises); // let second embed resolve

    // Now resolve the first (stale) promise
    await act(async () => {
      resolveA!(resultA);
      await flushPromises();
    });

    expect(finalizeA).toHaveBeenCalledTimes(1);
    expect(embed).toHaveBeenCalledTimes(2);
  });

  it("calls `onEmbed` with the same Result and never calls `onError`", async () => {
    const result = mkResult();
    (embed as jest.Mock).mockResolvedValueOnce(result);

    const onEmbed = jest.fn();
    const onError = jest.fn();

    render(<VegaEmbed spec="X" onEmbed={onEmbed} onError={onError} />);
    await act(flushPromises);

    expect(onEmbed).toHaveBeenCalledTimes(1);
    expect(onEmbed).toHaveBeenCalledWith(result);
    expect(onError).not.toHaveBeenCalled();
  });

  it("calls `onError` when embed rejects and suppresses uncaught logs", async () => {
    const err = new Error("boom");
    (embed as jest.Mock).mockRejectedValueOnce(err);

    const onError = jest.fn();
    const onEmbed = jest.fn();

    jest.spyOn(console, "error").mockImplementation(() => {});

    render(<VegaEmbed spec="bad" onEmbed={onEmbed} onError={onError} />);
    await act(flushPromises);

    expect(onError).toHaveBeenCalledWith(err);
    expect(onEmbed).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it("exposes the underlying <div> through the forwarded ref", async () => {
    (embed as jest.Mock).mockResolvedValueOnce(mkResult());

    const ref = React.createRef<HTMLDivElement>();
    render(<VegaEmbed ref={ref} spec="y" />);
    await act(flushPromises);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards additional props to the rendered div", async () => {
    (embed as jest.Mock).mockResolvedValueOnce(mkResult());

    const { getByTestId } = render(
      <VegaEmbed
        spec="z"
        className="foo"
        data-testid="vega"
        aria-label="chart"
      />
    );
    await act(flushPromises);

    const div = getByTestId("vega");
    expect(div).toHaveClass("foo");
    expect(div).toHaveAttribute("aria-label", "chart");
  });

  it("catches errors in `onEmbed`", async () => {
    const result = mkResult();
    (embed as jest.Mock).mockResolvedValueOnce(result);

    jest.spyOn(console, "error").mockImplementation(() => {});

    const onEmbed = jest.fn().mockImplementation(() => {
      throw new Error("boom");
    });

    const onError = jest.fn();

    render(<VegaEmbed spec="X" onEmbed={onEmbed} onError={onError} />);
    await act(flushPromises);

    expect(onEmbed).toHaveBeenCalledWith(result);
    expect(onError).toHaveBeenCalledWith(new Error("boom"));
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
