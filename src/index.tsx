/** @jsxRuntime classic */
/** @jsx jsx */
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { jsx } from '@emotion/react';

import './index.css';
import App from './App';
import { store } from './store/rootReducer';

render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
