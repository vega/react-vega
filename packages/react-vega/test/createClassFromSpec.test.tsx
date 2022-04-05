import React from 'react';
import { render, screen } from '@testing-library/react';
import { createClassFromSpec } from '../src';
import spec from './mock/vegaLiteSpec';

describe('createClassFromSpec', () => {
  const Component = createClassFromSpec({ mode: 'vega-lite', spec });

  describe('.getSpec()', () => {
    it('returns spec', () => {
      expect(Component.getSpec()).toBe(spec);
    });
  });

  it('renders', () => {
    render(<Component />);
    expect(screen.getByRole('svg')).toHaveLength(1);
  });
});
