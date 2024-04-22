import { AppStateType } from "../redux-store";

export const getAuthUserId = (state: AppStateType) => {
    return state.auth.id
}

export const getAuthUserPhoto = (state: AppStateType) => {
    return state.auth.photos
}