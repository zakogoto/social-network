import { AppStateType } from "../redux-store";

export const getUserPosts = (state: AppStateType) => {
    return state.profilePage.posts
}

export const getUserProfileInfo = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getNewPostData = (state: AppStateType) => {
    return state.profilePage.newPost
}

export const getProfileId = (state: AppStateType) => {
    return state.profilePage.id
}

export const getProfileStatus = (state: AppStateType) => {
    return state.profilePage.status
}

export const getIsFetching = (state: AppStateType) => {
    return state.profilePage.isFetching
}