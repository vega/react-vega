# `react-vega`

A lightweight React wrapper around [`vega-embed`](https://github.com/vega/vega-embed)

## Installation

```bash
npm i react-vega vega-embed vega-lite
```
If you need to use Vega (not Vega-Lite), you will also need to install `vega`.

```bash
npm i vega
```
## Migrating to v8

In v8, the `data` prop was removed. Additionally, you can no longer update data by changing `spec.data` without the view being re-embedded. Instead use the [View API](https://vega.github.io/vega/docs/api/view) to update data. See the [Dynamic data](#1-dynamic-data) recipe for an example.

The `height` and `width` props were removed. Additionally, you can no longer resize the view by changing `spec.width` or `spec.height` without the view being re-embedded. Instead use the [View API](https://vega.github.io/vega/docs/api/view) to resize the view. See the [Programmatically changing width & height](#2-programmatically-changing-width--height) recipe for an example.

The `signalListeners` prop was removed. Instead use the [View API](https://vega.github.io/vega/docs/api/view) to subscribe to signal events. See the [Subscribe to signal events](#3-subscribe-to-signal-events) recipe for an example.

Vega embed options are passed directly via the `options` prop, they are no longer flattened props on the `VegaEmbed` component.

## Quick start

```tsx
import { VegaEmbed } from "react-vega";

function Component() {
  return <VegaEmbed spec={spec} options={options} />;
}
```

or

```tsx
import { useVegaEmbed } from "react-vega";

function Component() {
  const ref = React.useRef<HTMLDivElement>(null);
  const result = useVegaEmbed({ ref, spec, options });
  return <div ref={ref} />;
}
```

## API

### `<VegaEmbed />`

| Prop                  | Type                                   | Default | Notes                                                     |
| --------------------- | -------------------------------------- | ------- | --------------------------------------------------------- |
| `spec` **(required)** | `VisualizationSpec \| string`          | —       | Inline spec or URL. Accepts both Vega & Vega-Lite.        |
| `options`             | [`EmbedOptions`](https://vega.github.io/vega-embed/interfaces/EmbedOptions.html)                         | `{}`    | Passed directly to [`embed()`](https://vega.github.io/vega-embed/functions/default.html).                         |
| `onEmbed`             | `(result: Result) => void`             | —       | Called once [`embed()`](https://vega.github.io/vega-embed/functions/default.html) resolves. See [`Result`](https://vega.github.io/vega-embed/interfaces/Result.html) for details.                            |
| `onError`             | `(err: unknown) => void`               | —       | Called if [`embed()`](https://vega.github.io/vega-embed/functions/default.html) rejects.                          |
| `...divProps`         | `React.HTMLAttributes<HTMLDivElement>` | —       | Forwarded to the `<div>` element used for embedding.                        |
| **ref**               | `React.Ref<HTMLDivElement>`            | —       | Forwarded to the `<div>` element used for embedding. |

### `useVegaEmbed(params)`

```ts
type UseVegaEmbedParams = {
  ref: React.RefObject<HTMLDivElement>;
  spec: VisualizationSpec | string;
  options?: EmbedOptions;
  onEmbed?: (r: Result) => void;
  onError?: (e: unknown) => void;
};

const result: Result | null = useVegaEmbed(params);
```

Returns the current [`Result`](https://vega.github.io/vega-embed/interfaces/Result.html) (or `null` while loading).

## Important
Any changes to `spec` or `options` will cause the view to be torn down and re-embedded. If you need to update the view without re-embedding, use the [View API](https://vega.github.io/vega/docs/api/view). Refer to the [Recipes](#recipes) section for common use cases.

## Recipes

See [storybook](https://vega.github.io/react-vega) for live examples.

### 1. Dynamic data

```tsx
const ref = React.useRef<HTMLDivElement>(null);
const embed = useVegaEmbed({ ref, spec, options: { mode: "vega-lite" } });

useEffect(() => {
  embed?.view.data("values", data).runAsync();
}, [embed, data]);
```

### 2. Programmatically changing width & height

```tsx
const embed = useVegaEmbed({
  ref,
  spec,
});

const changeDimensions = (width: number, height: number) => {
  embed?.view.width(width).height(height).runAsync();
};
```
### 3. Subscribe to signal events

```tsx
const embed = useVegaEmbed({
  ref,
  spec,
});

useEffect(() => {
  const listener = (signal, data) => console.log(signal, data);

  embed?.view.addSignalListener("signal", listener);

  return () => {
    embed?.view.removeSignalListener("signal", listener);
  };
}, [embed]);

```

For more information see the documentation for [vega-embed](https://vega.github.io/vega-embed/) and the [vega View API](https://vega.github.io/vega/docs/api/view).

## Contributing

1. `npm i`
2. `npm run dev` – run the storybook
3. `npm run test` – run the test suite.
