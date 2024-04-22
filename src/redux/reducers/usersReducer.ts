import { ThunkAction } from "redux-thunk";
import { ResultCodes, usersAPI } from "../../api/api"
import { updateObject } from "../../helpers/objectHelper";
import { UserType } from "../types";
import { ToggleIsFetchingActionType } from "./profileReducer";
import { AppStateType } from "../redux-store";
import { Dispatch } from "redux";


const initialState = {
    users: [] as Array<UserType>,
    pageSizeNumber: 10,
    portionSize: 10,
    totalUsersCount: null as number | null,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>

}

type InitialStateType = typeof initialState

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING'

type FollowActionType = {
    type: typeof FOLLOW,
    id: number
}
type UnfollowActionType = {
    type: typeof UNFOLLOW,
    id: number
}
type SetUsersActionType = {
    type: typeof SET_USERS,
    users:  Array<UserType>
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type ToggleIsFollowingActionType = {
    type: typeof TOGGLE_IS_FOLLOWING,
    isFetching: boolean,
    id: number
    
}

export type UsersActionsType = FollowActionType | UnfollowActionType | SetUsersActionType | SetTotalUsersCountActionType | SetCurrentPageActionType | ToggleIsFollowingActionType | ToggleIsFetchingActionType

type DispatchType = Dispatch<UsersActionsType>

type ThunkType = ThunkAction<Promise<void> | void, AppStateType, unknown, UsersActionsType>

const usersReducer = (state: InitialStateType = initialState, action: UsersActionsType): InitialStateType => {
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
                ...state, totalUsersCount: action.totalUsersCount
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
                ...state, 
                followingInProgress: action.isFetching 
                    ? [...state.followingInProgress, action.id] 
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state
    }
}

export default usersReducer

export const follow = (id: number): FollowActionType => {
    return { type: FOLLOW, id }
}
export const unfollow = (id: number): UnfollowActionType => {
    return { type: UNFOLLOW, id }
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => {
    return { type: SET_USERS, users }
}

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}

export const toggleIsFollowing = (isFetching: boolean, id: number): ToggleIsFollowingActionType => {
    return {type: TOGGLE_IS_FOLLOWING, isFetching, id}
}

export const requestUsers = (page: number, pageSizeNumber: number): ThunkType => (dispatch) => {
    dispatch(toggleIsFetching(true))
    usersAPI.getUsers(page, pageSizeNumber).then(data => {
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(toggleIsFetching(false))
    }) 
}

const followUnfollowToggler = async (
    dispatch: DispatchType, userId: number, 
    ApiMethod: typeof usersAPI.followUser | typeof usersAPI.unfollowUser,
    actionCreator:(userId: number) => FollowActionType | UnfollowActionType) => {
        dispatch(toggleIsFollowing(true, userId))
        let data = await ApiMethod(userId)
        if(data.resultCode === ResultCodes.Success) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleIsFollowing(false, userId))

}

export const followUser = (userId: number): ThunkType => {
    return (dispatch) => {
        followUnfollowToggler(dispatch, userId, usersAPI.followUser, follow)
    }
}

export const unfollowUser = (userId: number): ThunkType => {
    return (dispatch) => {
        followUnfollowToggler(dispatch, userId, usersAPI.unfollowUser, unfollow)
    }
}