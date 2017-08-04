import { CHANGE_FORM_DATA, ERASE_FORM_DATA } from '../common/constants'

const initialState = {
    name: '',
    password: ''
};

export default function applicationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CHANGE_FORM_DATA:
            return {
                ...state,
                ...payload
            };
        case ERASE_FORM_DATA:{
            return {
                ...state,
                ...initialState
            }
        }
        default:
            return state
    }
}