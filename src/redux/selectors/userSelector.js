import { createSelector } from "reselect"

const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(user=> user );
})

export const getTotalUserCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}
export const getPortionSize = (state) => {
    return state.usersPage.portionSize
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingProgress = (state) => {
    return state.usersPage.followingInProgress
}