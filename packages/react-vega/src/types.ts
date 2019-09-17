import { Result } from 'vega-embed';

export type View = Result['view'];

export type PlainObject = {
  [key: string]: any;
};

export type SignalListener = (name: string, value: any) => void;

export type SignalListeners = {
  [key: string]: SignalListener;
};

export type ViewListener = (view: View) => void;
