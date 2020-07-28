import React from 'react';
import { mount } from 'enzyme';
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
    const wrapper = mount(<Component />);

    return new Promise((done) => {
      setTimeout(() => {
        const renderedWrapper = wrapper.render();
        expect(renderedWrapper.find('svg')).toHaveLength(1);
      });
      done();
    });
  });
});
