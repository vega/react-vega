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
| `onEmbed`             | `(result: Result) => void`             | —       | Called once `embed()` resolves. See [`Result`](https://vega.github.io/vega-embed/interfaces/Result.html) for details.                            |
| `onError`             | `(err: unknown) => void`               | —       | Called if [`embed()`](https://vega.github.io/vega-embed/functions/default.html) rejects.                          |
| `...divProps`         | `React.HTMLAttributes<HTMLDivElement>` | —       | Forwarded to the `<div>` element used for embedding.                        |
| **ref**               | `React.Ref<HTMLDivElement>`            | —       | Pass a ref to the `<div>` element used for embedding. |

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

**Important** Changes to `spec` or `options` will cause the view to be torn down and re-embedded. If you need to update the view without re-embedding, use the [View API](https://vega.github.io/vega/docs/api/view). Refer to the [Recipes](#recipes) section for common use cases.

## Recipes

See [storybook](https://vega.github.io/react-vega) for live examples.

### 1. Updating data in place

```tsx
const embed = useVegaEmbed({ ref, spec, options: { mode: "vega-lite" } });

function randomize(data) {
  if (!embed) return;
  embed.view
    .data("values", values) // mutate dataset
    .runAsync();
}

return (
  <>
    <button onClick={randomize}>Randomize</button>
    <div ref={ref} />
  </>
);
```

### 2. Programmatically changing width & height

```tsx
const embed = useVegaEmbed({
  ref,
  spec,
});

const changeDimensions = (width: number, height: number) => {
  if (!embed) return;
  embed.view.width(width).height(height).runAsync();
};
```
### 3. Subscribe to signal events

```tsx
const embed = useVegaEmbed({
  ref,
  spec,
});

useEffect(() => {
  if (!embed) return;
  const listener = (signal, data) => {
    console.log(signal, data);
  };
  embed.view.addSignalListener("signal", listener);
  return () => {
    embed.view.removeSignalListener("signal", listener);
  };
}, [embed]);

```

For more information see the documentation for [vega-embed](https://vega.github.io/vega-embed/) and the [vega View API](https://vega.github.io/vega/docs/api/view).

## Contributing

1. `npm i`
2. `npm run dev` – run the storybook
3. `npm run test` – run the test suite.
