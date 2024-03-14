import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Profile from "./Profile"
import { getPosts, getUserProfile, getUserStatus, updateUserStatus, resetUserProfile } from '../../redux/reducers/profileReducer'
import withRouter from '../../hooks/withRouter'
import { withAuthForComponentWrapper } from '../../hoc/authRedirect'
import { compose } from 'redux'
import { getIsFetching, getNewPostData, getProfileId, getProfileStatus, getUserPosts, getUserProfileInfo } from '../../redux/selectors/profileSelector'
import { getAuthUserId } from '../../redux/selectors/authSelector'


const ProfileContainer = (props) => {

  const {router, authId, profileInfo, updateUserStatus, 
    status, getUserStatus, getUserProfile} = props

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
  }, [router.params.id])

  return (
    <Profile {...props} profileInfo={profileInfo} updateUserStatus={updateUserStatus} status={status}/>
  )
}

const MapStateToProps = (state) => {
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

export default compose (
  connect(MapStateToProps, {
  getPosts,
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  resetUserProfile}), 
  withRouter,
  withAuthForComponentWrapper
) (ProfileContainer)


