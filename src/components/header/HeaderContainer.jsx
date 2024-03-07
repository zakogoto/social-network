import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/reducers/authReducer'

class HeaderContainer extends Component {

  render() {
    return (
      <Header {...this.props} logout={this.props.logout}/>
    )
  }
}

const MapStateToProps = (state) => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    id: state.auth.id,
    isAuth: state.auth.isAuth
  }
}

export default connect(MapStateToProps, {logout}) (HeaderContainer)