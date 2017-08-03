import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import { createBrowserHistory } from 'history';
import { ConnectedRouter, syncHistoryWithStore} from 'react-router-redux'
import { configureStore } from './store'
import App from './containers/App'

const store = configureStore()
const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('application')
)