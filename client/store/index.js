import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/mapTo'
import { routerReducer } from 'react-router-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import userEpic from './epics/userEpic'
import reducers from '../reducers'

export function configureStore() {
    const rootEpic = combineEpics(userEpic)
    const epicMiddleware = createEpicMiddleware(rootEpic)
    const store = createStore(
        combineReducers({
        ...reducers,
        routing: routerReducer
        }),
        applyMiddleware(epicMiddleware)
        )
    return store
}