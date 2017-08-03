// import {} from '../constants'

const initialState = {
    modules:[]
};

export default function applicationReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case 'USER_DATA':
            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
}