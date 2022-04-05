import React from 'react';
import { render } from '@testing-library/react';
import { VegaLite } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<VegaLite>', () => {
  it('renders', async () => {
    const { container } = render(<VegaLite spec={spec} renderer="svg" />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(5);
  });
});
