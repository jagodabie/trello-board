import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { tasksApi } from './store/slices/apiSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApiProvider api={tasksApi}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);

reportWebVitals();
