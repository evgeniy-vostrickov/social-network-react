import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'; //подключаем стили bootstrap
import 'bootstrap/js/dist/dropdown'; //подключаем для работы js в bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css';
import './css/style.css';
import './css/croppie.css';
import './js/croppie.js';
import App from './App';
import reportWebVitals from '../src/reportWebVitals';
import AdminPage from './components/Admin/AdminPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={AdminPage} />
        <Route path="/" render={() => <Provider store={store} > <App /> </Provider>} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
