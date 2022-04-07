import React from 'react';
import { render } from '@testing-library/react';
import { Vega } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<Vega>', () => {
  const data1 = {
    source: [
      { a: 'B', b: 29 },
      { a: 'C', b: 20 },
    ],
  };
  const data2 = {
    source: [
      { a: 'B', b: 29 },
      { a: 'C', b: 20 },
      { a: 'D', b: 15 },
    ],
  };

  it('renders', async () => {
    const { container } = render(<Vega mode="vega-lite" spec={spec} renderer="svg" />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(5);
  });

  it('renders with data', async () => {
    const { container } = render(<Vega mode="vega-lite" renderer="svg" spec={spec} data={data1} />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelector('svg')).toBeDefined();
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(2);
  });

  it('updates data if changed', async () => {
    const { container, rerender } = render(
      <Vega mode="vega-lite" renderer="svg" spec={spec} data={data1} />,
    );

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(2);

    rerender(<Vega mode="vega-lite" renderer="svg" spec={spec} data={data2} />);

    await new Promise(resolve => setTimeout(resolve, 10));
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(3);
  });

  it('does not update data if does not changed', async () => {
    const { container, rerender } = render(
      <Vega mode="vega-lite" renderer="svg" spec={spec} data={data1} />,
    );
    rerender(<Vega mode="vega-lite" renderer="svg" spec={spec} data={data1} />);

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(container.querySelectorAll('g.mark-rect path')).toHaveLength(2);
  });
});
