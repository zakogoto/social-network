import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from "./Profile"
import { getPosts, getUserProfile, getUserStatus, updateUserStatus, resetUserProfile } from '../../redux/reducers/profileReducer'
import withRouter from '../../hooks/withRouter'
import { withAuthForComponentWrapper } from '../../hoc/authRedirect'
import { compose } from 'redux'


class ProfileContainer extends Component {

  componentDidMount = () => {
    this.getProfile()
  }

  componentDidUpdate =(prevProps) => {
    if(this.props.router.params.id !== prevProps.router.params.id ) {
      this.getProfile()
    }
  }

  getProfile = () => {
    let userId = this.props.router.params.id
    if (!userId) {
      userId = this.props.authId
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  render() {
    return (
      <Profile {...this.props} profileInfo={this.props.profileInfo} updateUserStatus={this.props.updateUserStatus} status={this.props.status}/>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPost: state.profilePage.newPost,
    id: state.profilePage.id,
    authId: state.auth.id,
    status: state.profilePage.status,
    profileInfo: state.profilePage.profileInfo,
    isFetching: state.profilePage.isFetching,
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


