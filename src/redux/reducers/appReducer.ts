import { getAuthUserData } from "./authReducer"

const initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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

export const appInitialized = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    promise.then(() => {
        dispatch(initializedSuccess())
    })
}