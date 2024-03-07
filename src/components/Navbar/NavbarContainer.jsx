// import React from 'react'
import withRouter from '../../hooks/withRouter'
import Navbar from './Navbar'
import { connect } from 'react-redux'

const MapStateToProps = (state) => {
  return {
    sideBarData: state.sidebar,
    isAuth: state.auth,
    id: state.auth.id
  }
}

const NavbarContainer = connect(MapStateToProps, {}) (withRouter(Navbar))

export default NavbarContainer