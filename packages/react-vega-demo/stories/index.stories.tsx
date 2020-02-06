import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import ReactVegaDemo from './ReactVegaDemo';
import ReactVegaLiteDemo from './ReactVegaLiteDemo';
import ChangingDimensionDemo from './ChangingDimensionDemo';
import './style.css';

storiesOf('react-vega', module)
  .add('Vega', () => <ReactVegaDemo />)
  .add('VegaLite', () => <ReactVegaLiteDemo />)
  .add('Changing dimension', () => <ChangingDimensionDemo />);
