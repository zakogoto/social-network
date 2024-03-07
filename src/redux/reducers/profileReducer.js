import { profileAPI } from "../../api/api"

const initialState = {
    postsData: [],
    status: null,
    id: null,
    profileInfo: null,
    isFetching: false,
  }

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_POST:{
      return {
        ...state,
        postsData: [
          {name: 'you', post: action.newPost, imgSrc: 'https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg'},
          ...state.postsData
        ],
      }
    }case GET_POSTS:
      return {...state, postsData: action.posts}

    case GET_PROFILE_INFO:
      return {...state, profileInfo: action.profileInfo}

    case GET_STATUS:
      return {...state, status: action.status}

    case TOGGLE_IS_FETCHING:
          return {
              ...state, isFetching: action.isFetching
          }
    case RESET_PROFILE_INFO:
      return {
        ...state, postsData: [], id: null, status: null, profileInfo: null
      }
    default:
      return state
  }
} 

const ADD_NEW_POST = 'ADD_NEW_POST'
const GET_POSTS = 'GET_POSTS'
const GET_PROFILE_INFO = 'GET_PROFILE_INFO'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const GET_STATUS = 'GET_STATUS'
const RESET_PROFILE_INFO = 'RESET_PROFILE_INFO'

export const addNewPost = (newPost) => {
    return {
      type: ADD_NEW_POST,
      newPost
    }
}
  
export const getPosts = (posts) => {
  return {
    type: GET_POSTS,
    posts
  }
}
const getStatus = (status) => {
  return {
    type: GET_STATUS,
    status
  }
}

const getProfileInfo = (profileInfo) => {
  return {
    type: GET_PROFILE_INFO,
    profileInfo
  }
}
const toggleIsFetching = (isFetching) => {
  return {type: TOGGLE_IS_FETCHING, isFetching}
}

const resetProfileInfo = () => {
  return {type: RESET_PROFILE_INFO}
}

export const getUserProfile = (userId) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true))
    profileAPI.getProfile(userId)
    .then(response => response.data) 
    .then(data => {
      dispatch(getProfileInfo(data))
    })
    dispatch(toggleIsFetching(false))
  }
}

export const getUserStatus = (userId) => (dispatch) => {
  
  profileAPI.getProfileStatus(userId)
  .then(response => response.data)
  .then(data => {
    dispatch(getStatus(data))
  }).catch(e => {
    console.log(e)
  }
)
}
export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateProfileStatus(status).then(response => {
    if (response.data.resultCode === 0 ) {
      debugger
      dispatch(getStatus(status))
    }
  }).catch(e => {
      console.log(e)
    }
  )
}

export const resetUserProfile = () => (dispatch) => {
  dispatch(resetProfileInfo())
}