// import { stopSubmit } from "redux-form"
import { stopSubmit } from "redux-form";
import { profileAPI } from "../../api/api"

type ProfileInfoType = {
  id: number | null,
  fullName: string | null,
  photos?: {large: string | null, small: string | null},
  lookingForAJob: boolean,
  aboutMe: string | null,
  lookingForAJobDescription: string | null,
  contacts: {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
  }
}

type PostType = {
  id: number,
  message: string,
  imgSrc: string
}

type PostsDataType =  Array<PostType>

const initialState = {
    postsData: [] as PostsDataType,
    status: null as string | null,
    id: null as number | null,
    profileInfo: null as ProfileInfoType | null,
    isFetching: false,
}

export type initialStateType = typeof initialState;

type ActionType = {
  type: typeof ADD_NEW_POST 
  | typeof GET_POSTS 
  | typeof GET_PROFILE_INFO 
  | typeof GET_STATUS 
  | typeof RESET_PROFILE_INFO 
  | typeof TOGGLE_IS_FETCHING 
  | typeof DELETE_POST 
  | typeof SAVE_PHOTO_SUCCESS,
  payload?: any,
}

const ADD_NEW_POST = 'ADD_NEW_POST'
const GET_POSTS = 'GET_POSTS'
const GET_PROFILE_INFO = 'GET_PROFILE_INFO'
const GET_STATUS = 'GET_STATUS'
const RESET_PROFILE_INFO = 'RESET_PROFILE_INFO'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

export default function profileReducer(state: initialStateType = initialState, action: ActionType) {
  switch (action.type) {
    case ADD_NEW_POST:{
      return {
        ...state,
        postsData: [
          {id: state.postsData.length, name: 'you', message: action.payload, imgSrc: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg'},
          ...state.postsData
        ],
      }
    }case GET_POSTS:
      return {...state, postsData: action.payload}

    case GET_PROFILE_INFO:
      debugger
      return {...state, profileInfo: action.payload}

    case GET_STATUS:
      return {...state, status: action.payload}

    case TOGGLE_IS_FETCHING:
          return {
              ...state, isFetching: action.payload
          }
    case RESET_PROFILE_INFO:
      return {
        ...state, postsData: [], id: null, status: null, profileInfo: null
      }
    case DELETE_POST:
      return {
        ...state, postsData: state.postsData.filter( p => p.id !== action.payload)
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state, profileInfo: {...state.profileInfo, photos: action.payload}
      }
    default:
      return state
  }
} 

export const addNewPost = (payload: PostsDataType) => {
    return {
      type: ADD_NEW_POST,
      payload
    }
}

export const deletePost = (payload: number) => {
  return {
    type: DELETE_POST,
    payload
  }
}
  
export const getPosts = (payload: PostsDataType) => {
  return {
    type: GET_POSTS,
    payload
  }
}
const getStatus = (payload: string) => {
  return {
    type: GET_STATUS,
    payload
  }
}

const getProfileInfo = (payload: ProfileInfoType) => {
  return {
    type: GET_PROFILE_INFO,
    payload
  }
}

const toggleIsFetching = (payload: boolean) => {
  return {type: TOGGLE_IS_FETCHING, payload}
}

const resetProfileInfo = () => {
  return {type: RESET_PROFILE_INFO}
}

const savePhotoSuccess = (payload: {}) => {
  return {type: SAVE_PHOTO_SUCCESS, payload}
}

export const getUserProfile = (userId: number) => {
  return (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    profileAPI.getProfile(userId)
    .then(response => response.data) 
    .then(data => {
      debugger
      dispatch(getProfileInfo(data))
    })
    dispatch(toggleIsFetching(false))
  }
}

export const getUserStatus = (userId: number) => (dispatch: any) => {
  
  profileAPI.getProfileStatus(userId)
  .then(response => response.data)
  .then(data => {
    dispatch(getStatus(data))
  }).catch(e => {
    console.log(e)
  })
}

export const updateUserStatus = (status: string) => (dispatch: any) => {
  profileAPI.updateProfileStatus(status).then(response => {
    if (response.data.resultCode === 0 ) {
      dispatch(getStatus(status))
    }
  }).catch(e => {
      console.log(e)
    }
  )
}

export const resetUserProfile = () => (dispatch: any) => {
  dispatch(resetProfileInfo())
}

export const savePhoto = (photos: {}) => (dispatch: any) => {
  profileAPI.savePhoto(photos).then(response => {
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos))
    }
  })
}

export const updateProfileInfo = (formData: ProfileInfoType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  const response = await profileAPI.updateProfile(formData);
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    debugger
    dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
  }
}