import React from "react";
import embed from "vega-embed";
import deepEqual from "fast-deep-equal";
import type { Result, VisualizationSpec, EmbedOptions } from "vega-embed";

export type UseVegaEmbedParams = {
  ref: React.RefObject<HTMLDivElement | null>;
  spec: VisualizationSpec | string;
  options?: EmbedOptions;
  onEmbed?: (result: Result) => void;
  onError?: (error: unknown) => void;
};

export function useVegaEmbed(params: UseVegaEmbedParams): Result | null {
  const [result, setResult] = React.useState<Result | null>(null);

  const { ref, spec, onEmbed, onError, options = {} } = params;

  useDeepEffect(() => {
    let cancel = false;
    let currentResult: Result | null = null;

    const createView = async () => {
      if (!ref.current || cancel) return;
      try {
        currentResult = await embed(ref.current, spec, options);

        if (cancel) {
          currentResult.finalize();
          return;
        }

        setResult(currentResult);

        onEmbed?.(currentResult);
      } catch (error) {
        console.error(`[react-vega] Error creating view: ${error}`);
        onError?.(error);
      }
    };

    createView();
    return () => {
      cancel = true;
      currentResult?.finalize();
    };
  }, [spec, options]);

  return result;
}

function useDeepEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
) {
  const ref = React.useRef<React.DependencyList | null>(null);
  const signalRef = React.useRef<number>(0);
  if (!ref.current || !deepEqual(deps, ref.current)) {
    signalRef.current += 1;
  }
  ref.current = deps;
  React.useEffect(effect, [signalRef.current]);
}

export type VegaEmbedProps = Omit<UseVegaEmbedParams, "ref"> &
  React.HTMLAttributes<HTMLDivElement>;

export const VegaEmbed = React.forwardRef<HTMLDivElement, VegaEmbedProps>(
  (props, forwardedRef) => {
    const { spec, options, onEmbed, onError, ...divProps } = props;

    const ref = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(forwardedRef, () => {
      if (!ref.current) {
        throw new Error("VegaEmbed: ref is not attached to a div element");
      }
      return ref.current;
    }, []);

    useVegaEmbed({
      ref,
      spec,
      onEmbed,
      onError,
      options,
    });

    return <div ref={ref} {...divProps} />;
  },
);

VegaEmbed.displayName = "VegaEmbed";
