import { stopSubmit } from "redux-form"
import { authAPI, profileAPI, securityAPI } from "../../api/api"

const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    photo: null as string | null,
    captchaUrl: null as string | null,
    isAuth: false,
}

type InitialStateType = typeof initialState

type ActionType = {
    type: typeof SET_USER_DATA | typeof SET_AUTH_USER_PHOTO | typeof GET_CAPTCHA_URL,
    payload?: any
}

const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.payload,
            }
        case SET_AUTH_USER_PHOTO:
            return {
                ...state, photo: action.payload
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

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    }
}

export const setAuthUserPhoto = (photo: string | null) => {
    return { type: SET_AUTH_USER_PHOTO, payload: photo }
}

export const getCaptchaUrl = (captchaUrl: string | null) => {
    return {type: GET_CAPTCHA_URL, payload: captchaUrl}
}

export const getAuthUserPhoto = (id: number | null) => async (dispatch: any) => {
    const response: any = await profileAPI.getProfile(id)
    dispatch(setAuthUserPhoto(response.data.photos))
}

export const getAuthUserData = () => async (dispatch: any) => {
    try {
        const data = await authAPI.authMe();
        const { id, email, login } = data.data;
        dispatch( setUserData( id, email, login, true ) );
        dispatch( getAuthUserPhoto( id ) );
    } catch ( e: any ) {
        console.log( e.message );
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => async (dispatch: any) => {
    const response: any = await authAPI.login(email, password, rememberMe, captcha);
    
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
        dispatch(getCaptchaUrl(null))
    } else {
        if (response.data.resultCode === 10) {
            securityAPI.getCaptcha().then(response => {
                debugger
                dispatch(getCaptchaUrl(response.data.url))
            })
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Something wrong, try again later'
            dispatch(stopSubmit('login', {_error: message}))
        }

    }
}

export const logout = () => async (dispatch: any) => {
    try {
        const response: any = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserData(null, null, null, false))
            dispatch(setAuthUserPhoto(null))
          }
    } catch (e: any) {
        console.log(e.messages)
    }
}