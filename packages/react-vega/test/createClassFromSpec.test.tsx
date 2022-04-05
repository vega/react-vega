import React from 'react';
import { render } from '@testing-library/react';
import { createClassFromSpec } from '../src';
import spec from './mock/vegaLiteSpec';

describe('createClassFromSpec', () => {
  const Component = createClassFromSpec({ mode: 'vega-lite', spec });

  describe('.getSpec()', () => {
    it('returns spec', () => {
      expect(Component.getSpec()).toBe(spec);
    });
  });

  it('renders', async () => {
    const { container } = render(<Component renderer="svg" width={100} height={100} />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(5);
  });
});
