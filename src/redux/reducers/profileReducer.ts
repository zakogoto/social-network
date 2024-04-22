// import { stopSubmit } from "redux-form"
import { stopSubmit } from "redux-form";
import { ResultCodes, profileAPI } from "../../api/api"
import { PhotosType, PostType, ProfileType } from "../types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "../redux-store";
import { AuthActionsTypes, setAuthUserPhoto } from "./authReducer";

const initialState = {
    posts: [] as Array<PostType>,
    newPost: '',
    status: '',
    id: null as number | null,
    profile: null  as ProfileType | null,
    isFetching: false,
}

export type InitialStateType = typeof initialState;

const ADD_NEW_POST = 'ADD_NEW_POST'
const GET_POSTS = 'GET_POSTS'
const GET_PROFILE = 'GET_PROFILE'
const GET_STATUS = 'GET_STATUS'
const RESET_PROFILE = 'RESET_PROFILE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

export type AddNewPostActionType = {
  type: typeof ADD_NEW_POST,
  message: string
}

export type GetPostsActionType = {
  type: typeof GET_POSTS ,
  posts: Array<PostType>
}

export type GetProfileActionType = {
  type: typeof GET_PROFILE,
  profile: ProfileType
}

export type ResetProfileActionType = {
  type: typeof RESET_PROFILE,
}

export type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING,
  isFetching: boolean
}

export type DeletePostActionType = {
  type: typeof DELETE_POST,
  id: number
}

export type GetStatusActionType = {
  type: typeof GET_STATUS,
  status: string
}

export type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}

type ProfileActionCreatorType = 
          AddNewPostActionType 
        | GetPostsActionType 
        | GetProfileActionType 
        | GetStatusActionType 
        | DeletePostActionType 
        | ResetProfileActionType 
        | ToggleIsFetchingActionType 
        | SavePhotoSuccessActionType

type ThunkActionType = ThunkAction<Promise<void> | void, AppStateType, unknown, ProfileActionCreatorType | AuthActionsTypes>

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionCreatorType): InitialStateType => {
  switch (action.type) {
    case ADD_NEW_POST:{
      return {
        ...state,
        posts: [
          {id: state.posts.length, name: state.profile?.fullName, message: action.message, imgSrc: state.profile?.photos.small} as PostType,
          ...state.posts
        ],
      }
    }case GET_POSTS:
      return {...state, posts: action.posts}

    case GET_PROFILE:
      return {...state, profile: action.profile}

    case GET_STATUS:
      return {...state, status: action.status}

    case TOGGLE_IS_FETCHING:
          return {
              ...state, isFetching: action.isFetching
          }
    case RESET_PROFILE:
      return {
        ...state, posts: [], id: null, status: '', profile: null
      }
    case DELETE_POST:
      return {
        ...state, posts: state.posts.filter( p => p.id !== action.id)
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state, profile: {...state.profile, photos: action.photos} as ProfileType
      }
    default:
      return state
  }
} 

export default profileReducer

export const addNewPost = (message: string): AddNewPostActionType => {
    return {
      type: ADD_NEW_POST,
      message
    }
}

export const deletePost = (id: number): DeletePostActionType => {
  return {
    type: DELETE_POST,
    id
  }
}
  
export const getPosts = (posts: Array<PostType>): GetPostsActionType => {
  return {
    type: GET_POSTS,
    posts
  }
}
const getStatus = (status: string): GetStatusActionType => {
  return {
    type: GET_STATUS,
    status
  }
}

const getProfileInfo = (profile: ProfileType): GetProfileActionType => {
  return {
    type: GET_PROFILE,
    profile
  }
}

const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
  return {type: TOGGLE_IS_FETCHING, isFetching}
}

const resetProfileInfo = (): ResetProfileActionType => {
  return {type: RESET_PROFILE}
}

const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => {
  return {type: SAVE_PHOTO_SUCCESS, photos}
}

export const getUserProfile = (userId: number | null): ThunkActionType => (dispatch) => {
  dispatch(toggleIsFetching(true))
  profileAPI.getProfile(userId)
  .then(data => {
    dispatch(getProfileInfo(data))
  })
  dispatch(toggleIsFetching(false))
}

export const getUserStatus = (userId: number): ThunkActionType => (dispatch) => {
  
  profileAPI.getProfileStatus(userId)
  .then(status => {
    dispatch(getStatus(status))
  }).catch(e => {
    console.log(e)
  })
}

export const updateUserStatus = (status: string): ThunkActionType => (dispatch) => {
  profileAPI.updateProfileStatus(status).then(response => {
    if (response.data.resultCode === 0 ) {
      dispatch(getStatus(status))
    }
  }).catch(e => {
      console.log(e)
    }
  )
}

export const resetUserProfile = ():ThunkActionType => (dispatch) => {
  dispatch(resetProfileInfo())
}

export const savePhoto = (photos: PhotosType): ThunkActionType => (dispatch) => {
  profileAPI.savePhoto(photos).then(response => {
    if (response.resultCode === ResultCodes.Success) {
      dispatch(savePhotoSuccess(response.data.photos))
      dispatch(setAuthUserPhoto(response.data.photos))
    }
  })
}

export const updateProfileInfo = (formData: ProfileType):ThunkActionType => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const response = await profileAPI.updateProfile(formData);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    debugger
    dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
  }
}