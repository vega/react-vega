import React from "react";
import { useVegaEmbed, VegaEmbed } from "./VegaEmbed";
import { type VisualizationSpec } from "vega-embed";

const BasicSpec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v6.json",
  data: {
    values: [
      { a: "A", b: 28 },
      { a: "B", b: 55 },
      { a: "C", b: 43 },
      { a: "D", b: 91 },
      { a: "E", b: 81 },
      { a: "F", b: 53 },
      { a: "G", b: 19 },
      { a: "H", b: 87 },
      { a: "I", b: 52 },
    ],
  },
  params: [{ name: "selection", select: { type: "point", fields: ["a"] } }],
  mark: "bar",
  encoding: {
    x: { field: "a", type: "ordinal" },
    y: { field: "b", type: "quantitative" },
    tooltip: { field: "b", type: "quantitative" },
    color: {
      condition: { param: "selection", value: "steelblue" },
      value: "grey",
    },
  },
};

function makeRandomData() {
  const values: { a: string; b: number }[] = [];
  const chars = "ABCDEFGHI";
  for (let i = 0; i < 9; i++) {
    values.push({
      a: chars[i],
      b: Math.floor(Math.random() * 100),
    });
  }
  return values;
}

export const Basic = () => {
  return <VegaEmbed spec={BasicSpec} />;
};

export const Responsive = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const embed = useVegaEmbed({
    ref,
    spec: {
      ...BasicSpec,
      width: "container",
      height: "container",
      autosize: {
        contains: "padding",
      },
    },
    options: {
      mode: "vega-lite",
    },
  });

  React.useEffect(() => {
    if (!ref.current || !embed) return;
    const observer = new ResizeObserver(() => {
      window.dispatchEvent(new Event("resize"));
      embed?.view.runAsync();
    });

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [embed]);

  return (
    <div
      style={{
        resize: "both",
        border: "1px solid black",
        overflow: "hidden",
        display: "flex",
        width: "400px",
        height: "400px",
      }}
    >
      <div
        ref={ref}
        style={{
          flex: 1,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};

export const VegaLite = () => {
  return (
    <VegaEmbed
      spec={{
        $schema: "https://vega.github.io/schema/vega-lite/v6.json",
        data: {
          url: "https://vega.github.io/vega-datasets/data/sp500.csv",
        },
        vconcat: [
          {
            width: 480,
            mark: "area",
            encoding: {
              x: {
                field: "date",
                type: "temporal",
                scale: {
                  domain: { param: "brush" },
                },
                axis: { title: "" },
              },
              y: { field: "price", type: "quantitative" },
            },
          },
          {
            width: 480,
            height: 60,
            mark: "area",
            params: [
              {
                name: "brush",
                select: { type: "interval", encodings: ["x"] },
              },
            ],
            encoding: {
              x: {
                field: "date",
                type: "temporal",
                axis: { format: "%Y" },
              },
              y: {
                field: "price",
                type: "quantitative",
                axis: { tickCount: 3, grid: false },
              },
            },
          },
        ],
      }}
      options={{
        mode: "vega-lite",
      }}
    />
  );
};

export const Vega = () => {
  return (
    <VegaEmbed
      spec="https://vega.github.io/vega/examples/global-development.vg.json"
      options={{
        loader: {
          baseURL: "https://vega.github.io/vega-datasets/",
        },
      }}
    />
  );
};

export const Growing = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const vegaEmbed = useVegaEmbed({
    ref,
    spec: {
      ...BasicSpec,
      width: "container",
      height: "container",
    },
  });

  React.useEffect(() => {
    const FLOOR = 200;
    const CEILING = 600;

    let width = 400;
    let height = 400;
    let direction = "up";

    const interval = setInterval(() => {
      if (width + 1 >= CEILING) {
        direction = "down";
      } else if (width - 1 <= FLOOR) {
        direction = "up";
      }
      width = width + (direction === "up" ? 1 : -1);
      height = height + (direction === "up" ? 1 : -1);

      vegaEmbed?.view.width(width).height(height).runAsync();
    }, 10);
    return () => clearInterval(interval);
  }, [vegaEmbed]);

  return <div ref={ref} />;
};

export const DynamicData = () => {
  const [data, setData] =
    React.useState<{ a: string; b: number }[]>(makeRandomData());

  const ref = React.useRef<HTMLDivElement>(null);

  const embed = useVegaEmbed({
    ref,
    spec: {
      ...BasicSpec,
      data: {
        name: "values",
      },
    },
    options: { mode: "vega-lite" },
  });

  React.useEffect(() => {
    embed?.view.data("values", data).runAsync();
  }, [embed, data]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setData(makeRandomData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div ref={ref} />;
};

export const SignalListeners = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const embed = useVegaEmbed({
    ref,
    spec: BasicSpec,
  });

  const [selection, setSelection] = React.useState<string>();

  React.useEffect(() => {
    const listener = (_event, { a }: { a: string }) => {
      setSelection(a);
    };

    embed?.view.addSignalListener("selection", listener);

    return () => {
      embed?.view.removeSignalListener("selection", listener);
    };
  }, [embed]);

  return (
    <div>
      <p>Click on a bar</p>
      {selection && <p>You selected column {selection}</p>}
      <div ref={ref} />
    </div>
  );
};
