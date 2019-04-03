/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react';
import ReactVegaDemo from './ReactVegaDemo';
import ReactVegaLiteDemo from './ReactVegaLiteDemo';
import './style.css';

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('react-vega', module).add('Demo', () => <ReactVegaDemo />);
storiesOf('react-vega-lite', module).add('Demo', () => <ReactVegaLiteDemo />);
