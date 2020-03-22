import React from 'react';
import { mount } from 'enzyme';
import { VegaLite } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<VegaLite>', () => {
  it('renders', async () => {
    const wrapper = mount(<VegaLite spec={spec} renderer="svg" />);

    await new Promise(done => {
      setTimeout(done, 0);
    });
    const renderedWrapper = wrapper.render();
    expect(renderedWrapper.find('svg')).toHaveLength(2);
  });
});
