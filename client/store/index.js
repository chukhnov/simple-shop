import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/mapTo'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import userEpic from './epics/userEpic'
import reducers from '../reducers'


export const history = createHistory()
const historyMiddleware = routerMiddleware(history)

export function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const rootEpic = combineEpics(userEpic)
    const epicMiddleware = createEpicMiddleware(rootEpic)
    const store = createStore(
        combineReducers({
        ...reducers,
        routing: routerReducer
        }),
        composeEnhancers(applyMiddleware(historyMiddleware, epicMiddleware))
        )
    return store
}