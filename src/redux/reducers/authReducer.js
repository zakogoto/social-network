import { stopSubmit } from "redux-form"
import { authAPI } from "../../api/api"

const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state, 
                ...action.payload,
            }
        default:
            return state
    }
}

export default authReducer

const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (id, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {id, email, login, isAuth},
    }
}

export const getAuthUserData = () => (dispatch) => {
    return authAPI.authMe().then(data => {
        const {id, email, login} = data.data
        // debugger
        dispatch(setUserData(id, email, login, true))
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
        }
      })
}


