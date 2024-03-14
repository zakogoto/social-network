import { usersAPI } from "../../api/api"
import { updateObject } from "../../helpers/objectHelper"

const initialState = {
    users: [],
    pageSize: 10,
    portionSize: 10,
    totalUsersCount: null,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: updateObject(state.users, action.id, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state, users: updateObject(state.users, action.id, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state, 
                users: action.users
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.amount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, 
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state, followingInProgress: action.isFetching 
                ? [state.followingInProgress, action.id]
                : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

export default usersReducer

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

export const follow = (id) => {
    return { type: FOLLOW, id }
}
export const unfollow = (id) => {
    return { type: UNFOLLOW, id }
}

export const setUsers = (users) => {
    return { type: SET_USERS, users }
}

export const setTotalUsersCount = (amount) => {
    return {type: SET_TOTAL_USERS_COUNT, amount}
}

export const setCurrentPage = (currentPage) => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const toggleIsFetching = (isFetching) => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export const toggleIsFollowing = (isFetching, id) => {
    return {type: TOGGLE_IS_FOLLOWING, isFetching, id}
}

export const requestUsers = (page, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))
        })
    }
}

const followUnfollowToggler = async (dispatch, userId, ApiMethod, actionCreator) => {
    dispatch(toggleIsFollowing(true, userId))
    let response = await ApiMethod(userId)
    if(response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowing(false, userId))
}

export const followUser = (userId) => {
    return (dispatch) => {
        followUnfollowToggler(dispatch, userId, usersAPI.followUser, follow)
    }
}

export const unfollowUser = (userId) => {
    return (dispatch) => {
        followUnfollowToggler(dispatch, userId, usersAPI.unfollowUser, unfollow)
    }
}