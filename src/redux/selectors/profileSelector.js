export const getUserPosts = (state) => {
    return state.profilePage.postsData
}

export const getUserProfileInfo = (state) => {
    return state.profilePage.profileInfo
}

export const getNewPostData = (state) => {
    return state.profilePage.newPost
}

export const getProfileId = (state) => {
    return state.profilePage.id
}

export const getProfileStatus = (state) => {
    return state.profilePage.status
}

export const getIsFetching = (state) => {
    return state.profilePage.isFetching
}