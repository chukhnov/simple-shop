import {
    SIGN_UP,
    SIGN_IN,
    USER_DATA_LOAD,
    USER_DATA_CHANGE,
    SHOW_SIGN_UP_FORM,
    SHOW_SIGN_IN_FORM,
    ERASE_FORM_DATA,
    SHOW_INFO_MODAL,
    CHECK_TOKEN,
    UPDATE_USER_DATA,
    SAVE_USER_DATA,
    SIGN_OUT
} from '../../common/constants'
import { combineEpics } from 'redux-observable'
import { createAction } from '../../utils/createAction'
import { Observable } from 'rxjs/Rx'
import { routerMiddleware, push } from 'react-router-redux'

const showSignUpFormEpic = (action$, storeAPI$) => action$.ofType(SHOW_SIGN_UP_FORM)
    .mergeMap(action => {
        return [
            createAction(SHOW_SIGN_IN_FORM)(!action.payload),
            createAction(ERASE_FORM_DATA)()
        ]
    })

const signUpEpic = (action$, storeAPI$) => action$.ofType(SIGN_UP)
    .mergeMap(() => {
        const { name, password } = storeAPI$.getState().authorizationReducer

        return Observable.from(fetch('api/1/users/registration', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        const arrayOfActions = [createAction(ERASE_FORM_DATA)(), createAction(SHOW_INFO_MODAL)(modalData)]
                        if (responseSuccess) {
                            arrayOfActions.push(createAction(SHOW_SIGN_UP_FORM)(false))
                        }
                        return arrayOfActions
                    })
            })
    })

const signInEpic = (action$, storeAPI$) => action$.ofType(SIGN_IN)
    .mergeMap(() => {
        const { name, password } = storeAPI$.getState().authorizationReducer

        return Observable.from(fetch('api/1/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const arrayOfActions = [createAction(ERASE_FORM_DATA)()]
                        if (responseSuccess) {
                            const { token } = response
                            localStorage.setItem('jwtToken', token);
                            storeAPI$.dispatch(push('dashboard'))
                            arrayOfActions.push(createAction(SHOW_SIGN_UP_FORM)(false))
                            return arrayOfActions
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        arrayOfActions.push(createAction(SHOW_INFO_MODAL)(modalData))
                        return arrayOfActions
                    })
            })
    })

const checkToken = (action$, storeAPI$) => action$.ofType(CHECK_TOKEN)
    .mergeMap(action => {
        const token = localStorage.getItem('jwtToken')
        return Observable.from(fetch(`api/1/users/check/${token}`, {
            method: 'GET'
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const isDashboard = action.payload
                        const arrayOfActions = [createAction(ERASE_FORM_DATA)()]
                        if (responseSuccess) {
                            const { name, age, avatar, uId } = response
                            if (!isDashboard) {
                                storeAPI$.dispatch(push('dashboard'))
                            }
                            arrayOfActions.push(createAction(USER_DATA_LOAD)({ name, age, avatar, uId }))
                            return arrayOfActions
                        }

                        if (!isDashboard) {
                            storeAPI$.dispatch(push('/'))
                            return arrayOfActions
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        storeAPI$.dispatch(push('/'))
                        arrayOfActions.push(createAction(SHOW_INFO_MODAL)(modalData))
                        return arrayOfActions
                    })
            })
    })

const saveUserData = (action$, storeAPI$) => action$.ofType(SAVE_USER_DATA)
    .mergeMap(action => {
        const token = localStorage.getItem('jwtToken')
        const update = action.payload
        const uId = storeAPI$.getState().applicationReducer.uId

        return Observable.from(fetch(`api/1/users`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, uId, update })
        }).then(response => response))
            .mergeMap(response => {
                const responseSuccess = response.status === 200
                return Observable.from(response.json().then(data => data))
                    .mergeMap(response => {
                        const arrayOfActions = []
                        if (responseSuccess) {
                            const { name, age, avatar, uId } = response
                            arrayOfActions.push(createAction(USER_DATA_LOAD)({ name, age, avatar, uId }))
                            return arrayOfActions
                        }

                        const { message } = response
                        const modalData = {
                            show: true,
                            message
                        }
                        arrayOfActions.push(createAction(SHOW_INFO_MODAL)(modalData))
                        return arrayOfActions
                    })
            })
    })

const signOut = (action$, storeAPI$) => action$.ofType(SIGN_OUT)
    .map(()=> {
        localStorage.clear()
        storeAPI$.dispatch(push('/'))
    })


export default combineEpics(signInEpic, showSignUpFormEpic, signUpEpic, checkToken, saveUserData, signOut)