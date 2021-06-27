import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './store';
import { ChartProvider } from './context/ChartContext'
import { PurchasedProvider } from './context/PurchasedContext'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PurchasedProvider>
        <ChartProvider>
          <App />
        </ChartProvider>
      </PurchasedProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
