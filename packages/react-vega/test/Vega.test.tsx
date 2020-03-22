import React from 'react';
import { mount } from 'enzyme';
import { Vega } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<Vega>', () => {
  it('renders', async () => {
    const wrapper = mount(<Vega mode="vega-lite" spec={spec} renderer="svg" />);

    await new Promise(done => {
      setTimeout(done, 0);
    });
    const renderedWrapper = wrapper.render();
    expect(renderedWrapper.find('svg')).toHaveLength(2);
  });
});
