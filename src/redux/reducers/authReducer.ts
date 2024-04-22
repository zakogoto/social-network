import { stopSubmit } from "redux-form"
import { ResultCodeForCaptcha, ResultCodes, authAPI, profileAPI, securityAPI } from "../../api/api"
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux-store";
import { PhotosType } from "../types";

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    photos: null as PhotosType | null,
    captchaUrl: null as string | null,
    isAuth: false,
}

type InitialStateType = typeof initialState

export type AuthActionsTypes = SetUserDataActionType | SetAuthUserPhotoActionType |  GetCaptchaUrlActionType
    
type ThunkType = ThunkAction<void | Promise<void>, AppStateType, unknown, AuthActionsTypes>

type SetUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: {
        id: number | null, 
        email: string | null, 
        login: string | null, 
        isAuth: boolean
    }
}

type SetAuthUserPhotoActionType = {
    type: typeof SET_AUTH_USER_PHOTO,
    photos: PhotosType
}

type GetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL,
    payload: string | null
}

const authReducer = (state: InitialStateType = initialState, action: AuthActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.payload,
            }
        case SET_AUTH_USER_PHOTO:
            return {
                ...state, photos: action.photos
            }
        case GET_CAPTCHA_URL:
            return {...state, captchaUrl: action.payload}
        default:
            return state
    }
}

export default authReducer

const SET_USER_DATA = 'SET_USER_DATA'
const SET_AUTH_USER_PHOTO = 'SET_AUTH_USER_PHOTO'
const GET_CAPTCHA_URL = 'GET_CAPTCHA_URL'

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    }
}

export const setAuthUserPhoto = (photos: PhotosType): SetAuthUserPhotoActionType => {
    return { type: SET_AUTH_USER_PHOTO, photos }
}

export const getCaptchaUrl = (captchaUrl: string | null): GetCaptchaUrlActionType => {
    return {type: GET_CAPTCHA_URL, payload: captchaUrl}
}

export const getAuthUserPhoto = (id: number | null): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(id)
    dispatch(setAuthUserPhoto(data.photos))
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.authMe();
        if (data.resultCode === ResultCodes.Success) {
            const { id, email, login } = data.data;
            dispatch( setUserData( id, email, login, true ) );
            dispatch( getAuthUserPhoto( id ) );
        }
    } catch ( e: any ) {
        console.log( e.message );
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.login(email, password, rememberMe, captcha);
    
        if (data.resultCode === ResultCodes.Success) {
            dispatch(getAuthUserData())
            dispatch(getCaptchaUrl(null))
        } else if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
            securityAPI.getCaptcha().then(data => {
                debugger
                dispatch(getCaptchaUrl(data.url))
            })
        }else {
            const message = data.messages.length > 0 ? data.messages[0] : 'Something wrong, try again later'
            dispatch(stopSubmit('login', {_error: message}))
        }
    } catch(e: any) {
        console.log(e.messages)
    }
    // const data = await authAPI.login(email, password, rememberMe, captcha);
    
    // if (data.resultCode === ResultCodes.Success) {
    //     dispatch(getAuthUserData())
    //     dispatch(getCaptchaUrl(null))
    // } else {
    //     if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
    //         securityAPI.getCaptcha().then(data => {
    //             debugger
    //             dispatch(getCaptchaUrl(data.url))
    //         })
    //     } else {
    //         const message = data.messages.length > 0 ? data.messages[0] : 'Something wrong, try again later'
    //         dispatch(stopSubmit('login', {_error: message}))
    //     }

    // }
}

export const logout = (): ThunkType => async (dispatch) => {
    try {
        const data = await authAPI.logout()
        if (data.resultCode === ResultCodes.Success) {
            dispatch(setUserData(null, null, null, false))
            dispatch(setAuthUserPhoto({large: null, small: null}))
          }
    } catch (e: any) {
        console.log(e.messages)
    }
}