// react junk
import React from 'react';
import { render } from 'react-dom';
// components
import App from './components/App';
import Styles from '../styles/main.scss';

const rootEl = document.querySelector('#root');
render(<App />, rootEl);
