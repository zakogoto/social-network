import { usersAPI } from "../../api/api"
import { updateObject } from "../../helpers/objectHelper"

type UserType = {
    id: number | null,
    name: string | null,
    status: string | null,
    photos: {
        large: string | null,
        small: string | null
    },
    followed: boolean
}

type FollowingInProgressType = {
    id: number,
    followed: boolean
}

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    portionSize: 10,
    totalUsersCount: null as number | null,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<FollowingInProgressType>

}

type InitialStateType = typeof initialState

type ActionType = {
    type: typeof FOLLOW 
        | typeof UNFOLLOW 
        | typeof SET_USERS 
        | typeof SET_TOTAL_USERS_COUNT 
        | typeof SET_CURRENT_PAGE 
        | typeof TOGGLE_IS_FETCHING 
        | typeof TOGGLE_IS_FOLLOWING,
    payload?: any
}

const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: updateObject(state.users, action.payload, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state, users: updateObject(state.users, action.payload, 'id', {followed: false})
            }
        case SET_USERS:
            return {
                ...state, 
                users: action.payload
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, totalUsersCount: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state, 
                currentPage: action.payload
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.payload
            }
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state, followingInProgress: action.payload.isFetching 
                ? [state.followingInProgress, action.payload.id]
                : state.followingInProgress.filter(id => id !== action.payload.id)
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

export const follow = (id: number) => {
    return { type: FOLLOW, payload: id }
}
export const unfollow = (id: number) => {
    return { type: UNFOLLOW, payload: id }
}

export const setUsers = (users: Array<UserType>) => {
    return { type: SET_USERS, payload: users }
}

export const setTotalUsersCount = (amount: number) => {
    return {type: SET_TOTAL_USERS_COUNT, payload: amount}
}

export const setCurrentPage = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, payload: currentPage}
}

export const toggleIsFetching = (isFetching: boolean) => {
    return {type: TOGGLE_IS_FETCHING, payload: isFetching}
}

export const toggleIsFollowing = (isFetching: boolean, id: number) => {
    return {type: TOGGLE_IS_FOLLOWING, payload: {isFetching, id}}
}

export const requestUsers = (page: number, pageSize: number) => {
    return (dispatch: any) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(page, pageSize).then(data => {
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
            dispatch(toggleIsFetching(false))
        })
    }
}

const followUnfollowToggler = async (dispatch: any, userId: number, ApiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowing(true, userId))
    let response = await ApiMethod(userId)
    if(response.data.resultCode === 0) {
        debugger
        dispatch(actionCreator(userId))
    }
    dispatch(toggleIsFollowing(false, userId))
}

export const followUser = (userId: number) => {
    return (dispatch: any) => {
        followUnfollowToggler(dispatch, userId, usersAPI.followUser, follow)
    }
}

export const unfollowUser = (userId: number) => {
    return (dispatch: any) => {
        followUnfollowToggler(dispatch, userId, usersAPI.unfollowUser, unfollow)
    }
}