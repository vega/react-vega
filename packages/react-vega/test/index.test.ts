import { Vega, VegaLite, createClassFromSpec } from '../src';

describe('index', () => {
  it('exports Vega', () => {
    expect(Vega).toBeDefined();
  });
  it('exports VegaLite', () => {
    expect(VegaLite).toBeDefined();
  });
  it('exports createClassFromSpec', () => {
    expect(createClassFromSpec).toBeDefined();
  });
});
