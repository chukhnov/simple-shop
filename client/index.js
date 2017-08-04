import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux'
import { configureStore } from './store'
import createHistory from 'history/createBrowserHistory'
import App from './components/App'

const store = configureStore()
const history = createHistory()


ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('application')
)