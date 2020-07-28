import React from 'react';
import { mount } from 'enzyme';
import { Vega } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<Vega>', () => {
  it('renders', () => {
    const wrapper = mount(<Vega mode="vega-lite" spec={spec} />);

    return new Promise((done) => {
      setTimeout(() => {
        const renderedWrapper = wrapper.render();
        expect(renderedWrapper.find('svg')).toHaveLength(1);
      });
      done();
    });
  });

  it('renders with data', () => {
    const wrapper = mount(
      <Vega
        mode="vega-lite"
        spec={spec}
        data={{
          source: [{ category: 'A', amount: 28 }],
        }}
      />,
    );

    return new Promise((done) => {
      setTimeout(() => {
        const renderedWrapper = wrapper.render();
        expect(renderedWrapper.find('svg')).toHaveLength(1);
      });
      done();
    });
  });

  it('updates data if changed', () => {
    const wrapper = mount(
      <Vega
        mode="vega-lite"
        spec={spec}
        data={{
          source: [{ a: 'A', b: 28 }],
        }}
      />,
    );

    wrapper.setProps({ data: { source: [{ a: 'B', b: 29 }] } });

    return new Promise((done) => {
      setTimeout(() => {
        const renderedWrapper = wrapper.render();
        expect(renderedWrapper.find('svg')).toHaveLength(1);
      });
      done();
    });
  });

  it('does not update data if does not changed', () => {
    const source = [{ a: 'A', b: 28 }];

    const wrapper = mount(<Vega mode="vega-lite" spec={spec} data={{ source }} />);

    wrapper.setProps({ data: { source } });

    return new Promise((done) => {
      setTimeout(() => {
        const renderedWrapper = wrapper.render();
        expect(renderedWrapper.find('svg')).toHaveLength(1);
      });
      done();
    });
  });
});
