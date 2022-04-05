import React from 'react';
import { render, screen } from '@testing-library/react';
import { Vega } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<Vega>', () => {
  it('renders', () => {
    render(<Vega mode="vega-lite" spec={spec} />);
    expect(screen.getByRole('svg')).toHaveLength(1);
  });

  it('renders with data', () => {
    render(
      <Vega
        mode="vega-lite"
        spec={spec}
        data={{
          source: [{ category: 'A', amount: 28 }],
        }}
      />,
    );

    expect(screen.getByRole('svg')).toHaveLength(1);
  });

  it('updates data if changed', () => {
    const { rerender } = render(
      <Vega
        mode="vega-lite"
        spec={spec}
        data={{
          source: [{ a: 'A', b: 28 }],
        }}
      />,
    );

    expect(screen.getByRole('rect')).toHaveLength(1);

    rerender(
      <Vega
        mode="vega-lite"
        spec={spec}
        data={{
          data: {
            source: [
              { a: 'B', b: 29 },
              { a: 'C', b: 20 },
            ],
          },
        }}
      />,
    );

    expect(screen.getByRole('rect')).toHaveLength(2);
  });

  it('does not update data if does not changed', () => {
    const source = [{ a: 'A', b: 28 }];

    const { rerender } = render(<Vega mode="vega-lite" spec={spec} data={{ source }} />);
    rerender(<Vega mode="vega-lite" spec={spec} data={{ source }} />);

    expect(screen.getByRole('rect')).toHaveLength(1);
  });
});
