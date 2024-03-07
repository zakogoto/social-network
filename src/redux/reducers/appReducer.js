import { getAuthUserData } from "./authReducer"

const initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, 
                initialized: true
            }
        default:
            return state
    }
}

export default appReducer

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

export const appInitialized = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess())
    })
}