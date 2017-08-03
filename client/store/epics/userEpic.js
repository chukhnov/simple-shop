import { SIGN_UP, SIGN_IN, USER_DATA_LOAD, USER_DATA_CHANGE } from '../../common/constants'
import { createAction } from '../../utils/createAction'

const userEpic = (action$, storeAPI$) => action$.ofType(SIGN_IN)
    .map(action => (createAction(USER_DATA_LOAD)()))

export default userEpic