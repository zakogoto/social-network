import { stopSubmit } from "redux-form"
import { authAPI, profileAPI } from "../../api/api"

const initialState = {
    id: null,
    login: null,
    email: null,
    photo: null,
    isAuth: false

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.payload,
            }
        case SET_AUTH_USER_PHOTO:
            return {
                ...state, photo: action.photo
            }
        default:
            return state
    }
}

export default authReducer

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_USER_PHOTO = 'SET_AUTH_USER_PHOTO;'

export const setUserData = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    }
}

export const setAuthUserPhoto = (photo) => {
    return { type: SET_AUTH_USER_PHOTO, photo }
}

export const getAuthUserPhoto = (id) => async (dispatch) => {
    const response = await profileAPI.getProfile(id)
    dispatch(setAuthUserPhoto(response.data.photos))
}

export const getAuthUserData = () => (dispatch) => {
    return authAPI.authMe().then(data => {
        const {id, email, login} = data.data
        dispatch(setUserData(id, email, login, true))
        dispatch(getAuthUserPhoto(id))
      }).catch(e => {
        console.log(e.message)
      })
}


export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe).then(response => {
        if (response.data.resultCode===0) {
          dispatch(getAuthUserData())
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : 'Something wrong, try again later'
            dispatch(stopSubmit('login', {_error: message}))
        }
      })
}
export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
        if (response.data.resultCode===0) {
          dispatch(setUserData(null, null, null, false))
          dispatch(setAuthUserPhoto(null))
        }
      })
}


