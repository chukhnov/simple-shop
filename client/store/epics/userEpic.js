import { 
    SIGN_UP, 
    SIGN_IN, 
    USER_DATA_LOAD, 
    USER_DATA_CHANGE, 
    SHOW_SIGN_UP_FORM, 
    SHOW_SIGN_IN_FORM,
    ERASE_FORM_DATA 
} from '../../common/constants'
import { combineEpics } from 'redux-observable'
import { createAction } from '../../utils/createAction'

const userDataEpic = (action$, storeAPI$) => action$.ofType(SIGN_IN)
    .map(action => {
        return createAction(USER_DATA_LOAD)()
    })

const showSignUpForm = (action$, storeAPI$) => action$.ofType(SHOW_SIGN_UP_FORM)
    .mergeMap(action => {
            return [
                createAction(SHOW_SIGN_IN_FORM)(!action.payload), 
                createAction(ERASE_FORM_DATA)()
            ]
    })

export default combineEpics(userDataEpic, showSignUpForm)