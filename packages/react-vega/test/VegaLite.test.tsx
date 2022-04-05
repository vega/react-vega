import React from 'react';
import { render, screen } from '@testing-library/react';
import { VegaLite } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<Vega>', () => {
  it('renders', () => {
    render(<VegaLite spec={spec} />);
    expect(screen.getByRole('svg')).toHaveLength(1);
  });
});
