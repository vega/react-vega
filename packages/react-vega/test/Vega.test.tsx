import React from 'react';
import { mount } from 'enzyme';
import { Vega } from '../src';
import spec from './mock/vegaLiteSpec';

describe('<Vega>', () => {
  it('renders', () => {
    const wrapper = mount(<Vega mode="vega-lite" spec={spec} />);

    return new Promise(done => {
      setTimeout(() => {
        const renderedWrapper = wrapper.render();
        expect(renderedWrapper.find('svg')).toHaveLength(1);
      });
      done();
    });
  });
});
