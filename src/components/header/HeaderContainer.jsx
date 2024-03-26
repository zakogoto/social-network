import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/reducers/authReducer'
import { getAuthUserId, getAuthUserPhoto } from '../../redux/selectors/authSelector'

const HeaderContainer = (props) => {
 
  return (
    <Header {...props} logout={props.logout} profilePhoto={props.profilePhoto} />
  )

}

const MapStateToProps = (state) => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    id: getAuthUserId(state),
    isAuth: state.auth.isAuth,
    profilePhoto: getAuthUserPhoto(state)
  }
}

export default connect(MapStateToProps, {logout}) (HeaderContainer)