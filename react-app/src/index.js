import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import configureStore from './store';
import { ChartProvider } from './context/ChartContext'
import { PurchasedProvider } from './context/PurchasedContext'
import { PricesProvider } from './context/PricesContext'
import { ArticlesProvider } from './context/ArticlesContext'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PurchasedProvider>
        <PricesProvider>

          <ChartProvider>
            <ArticlesProvider>
              <App />
            </ArticlesProvider>
          </ChartProvider>
        </PricesProvider>
      </PurchasedProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
