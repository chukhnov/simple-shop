import {
    SHOW_SIGN_UP_FORM,
    USER_DATA_LOAD,
    SHOW_SIGN_IN_FORM,
    SHOW_INFO_MODAL,
    SHOW_EDIT_MODAL,
    UPDATE_USER_DATA,
    SAVE_USER_DATA
} from '../common/constants'

const initialState = {
    showSignInForm: true,
    showSignUpForm: false,
    showInformationModal: false,
    informationModalBody: null,
    uId: null,
    name: null,
    age: null,
    avatar: null,
    temporaryAge: '',
    temporaryName: '',
    editModalEditedField: null,
    showEditModal: false
};

export default function applicationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_DATA_LOAD: {
            return {
                ...state,
                temporaryAge: '',
                temporaryName: '',
                editModalEditedField: null,
                ...payload
            }
        }
        case SHOW_SIGN_UP_FORM: {
            return {
                ...state,
                showSignUpForm: payload
            }
        }
        case SHOW_SIGN_IN_FORM: {
            return {
                ...state,
                showSignInForm: payload
            }
        }
        case SHOW_INFO_MODAL: {
            return {
                ...state,
                showInformationModal: payload.show,
                informationModalBody: payload.message
            }
        }
        case SHOW_EDIT_MODAL: {
            return {
                ...state,
                showEditModal: payload.show,
                editModalEditedField: payload.message
            }
        }
        case UPDATE_USER_DATA: {
            return {
                ...state,
                ...payload
            }
        }
        case SAVE_USER_DATA: {
            return {
                ...state,
                showEditModal: false
            }
        }
        default:
            return state
    }
}