import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import { I18nextProvider } from 'react-i18next';

import "@babel/polyfill";

import i18n from './i18n';

// import Stores & Helpers
import Store from './stores/Store'

// import components
import App from './App'

const browserHistory = createBrowserHistory();

// create stores
const store = new Store(browserHistory)

// render App component and bind to div#root
ReactDOM.render(
  <I18nextProvider i18n={ i18n }>
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path='/' component={App} />
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);
