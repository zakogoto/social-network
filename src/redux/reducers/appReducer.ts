// import { Dispatch } from "redux";
import { getAuthUserData } from "./authReducer"
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux-store";

const initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

type InitializedSuccessActionType = {type: typeof INITIALIZED_SUCCESS}

type ActionsTypes = InitializedSuccessActionType

// type DispatchTypes = Dispatch<ActionsTypes>

// type GetStateType = () => AppStateType

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
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

const initializedSuccess = (): InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

export const appInitialized = (): ThunkType => (dispatch) => {
    // let promise = 
    // promise.then(() => {
    // })
    dispatch(getAuthUserData());
    dispatch(initializedSuccess())
}