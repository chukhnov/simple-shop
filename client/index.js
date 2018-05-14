import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux'
import { configureStore, history } from './store'
import Home from './components/Home'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        {/* <Route path ="/dashboard" component={Dashboard}/> */}
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('application')
)