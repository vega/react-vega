import type { Result } from 'vega-embed';

/** Vega View object */
export type View = Result['view'];

export type PlainObject = {
  [key: string]: unknown;
};

export type SignalListener = (name: string, value: unknown) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};

/** Handler of view actions */
export type ViewListener = (view: View) => void;

export * from './reExport';
