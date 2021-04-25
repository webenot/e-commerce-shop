import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'antd/dist/antd.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap-reboot.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap-grid.min.css';

import './assets/sass/style.sass';
import 'App/index.css';
import { App } from 'App/App';
import reportWebVitals from 'App/reportWebVitals';
import { rootReducer } from 'Reducers';

// store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
