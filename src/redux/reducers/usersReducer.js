import { usersAPI } from "../../api/api"

const initialState = {
    users: [],
    pageSize: 4,
    totalUsersCount: 40,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, 
                users: state.users.map(u=> {
                    if(u.id === action.id) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state, 
                users: state.users.map(u=> {
                    if(u.id === action.id) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:
            return {
                ...state, 
                users: action.users
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, 
                totalUsersCount: action.count
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
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

export const follow = (id) => {
    return {
        type: FOLLOW,
        id: id
    }
}
export const unfollow = (id) => {
    return {
        type: UNFOLLOW,
        id: id
    }
}

export const setUsers = (data) => {
    return {
        type: SET_USERS,
        users: data
    }
}
export const setTotalUsersCount = (count) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        count: count
    }
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

export const getUsers = (page, pageSize) => {
    return (dispatch) => {

        dispatch(toggleIsFetching(true))
        
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(toggleIsFetching(false))
        })
    }
}

export const followUser = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowing(true, userId))
        usersAPI.followUser(userId)
        dispatch(follow(userId))
        dispatch(toggleIsFollowing(false, userId))
    }
}

export const unfollowUser = (userId) => {
    return (dispatch) => {
        dispatch(toggleIsFollowing(true, userId))
        usersAPI.unfollowUser(userId) 
        dispatch(unfollow(userId))
        dispatch(toggleIsFollowing(false, userId))
    }
}