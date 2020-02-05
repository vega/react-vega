import { Result } from 'vega-embed';

export type View = Result['view'];

export type PlainObject = {
  [key: string]: unknown;
};

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};

export type ViewListener = (view: View) => void;
