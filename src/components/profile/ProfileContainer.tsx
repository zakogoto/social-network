import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import Profile from "./Profile"
import { getPosts, getUserProfile, getUserStatus, updateUserStatus, resetUserProfile, savePhoto, updateProfileInfo, addNewPost } from '../../redux/reducers/profileReducer'
import withRouter, { RouterPropsType } from '../../hooks/withRouter'
import { withAuthForComponentWrapper } from '../../hoc/authRedirect'
import { compose } from 'redux'
import { getIsFetching, getNewPostData, getProfileId, getProfileStatus, getUserPosts, getUserProfileInfo } from '../../redux/selectors/profileSelector'
import { getAuthUserId } from '../../redux/selectors/authSelector'
import { PostType, ProfileType } from '../../redux/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
  postsData: Array<PostType>,
  newPost: string,
  id: number | null,
  authId: number | null,
  status: string,
  profileInfo: ProfileType | null,
  isFetching: boolean,
}

type MapDispatchToPropsType = {
  getPosts: (posts: Array<PostType>) => void,
  getUserProfile: (userId: number) => void,
  getUserStatus: (userId: number) => void,
  updateUserStatus: (status: string) => void,
  resetUserProfile: () => void, 
  savePhoto: (photos: any) => void,
  updateProfileInfo: (formData: ProfileType) => void,
  addNewPost: (message: string) => void
}

type OwnPropsType = {
  getProfile: () => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType & RouterPropsType

const ProfileContainer: FC<PropsType> = (props) => {

  const {router, authId, profileInfo, updateUserStatus, 
    status, getUserStatus, getUserProfile, savePhoto, updateProfileInfo, addNewPost, postsData} = props
  const getProfile = () => {
    let userId = router.params.id
    if (!userId) {
      userId = authId
    }
    getUserProfile(userId)
    getUserStatus(userId)
  }
  
  useEffect(() => {
    getProfile()
    // eslint-disable-next-line
  }, [router.params.id])

  return (
    <Profile {...props} isOwner={!router.params.id} profileInfo={profileInfo} 
      updateProfileInfo={updateProfileInfo} updateUserStatus={updateUserStatus} 
      status={status} savePhoto={savePhoto} getUserProfile={getUserProfile} addNewPost={addNewPost} postsData={postsData}/>
  )
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    postsData: getUserPosts(state),
    newPost: getNewPostData(state),
    id: getProfileId(state),
    authId: getAuthUserId(state),
    status: getProfileStatus(state),
    profileInfo: getUserProfileInfo(state),
    isFetching: getIsFetching(state),
  }
}

export default compose<AppStateType & MapStateToPropsType & MapDispatchToPropsType & OwnPropsType & RouterPropsType> (
  connect(MapStateToProps, {
  getPosts,
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  resetUserProfile, 
  savePhoto,
  updateProfileInfo,
  addNewPost}), 
  withRouter,
  withAuthForComponentWrapper
) (ProfileContainer)