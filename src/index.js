import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import 'primeflex/primeflex.css';
import 'primereact/resources/themes/arya-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./assets/css/main.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
