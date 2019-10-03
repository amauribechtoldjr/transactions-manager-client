import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

import Routes from './Routes';

import { Provider } from 'react-redux';
import store from '../store/store';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif
  }
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Routes />
    </Provider>
  );
};

export default App;
