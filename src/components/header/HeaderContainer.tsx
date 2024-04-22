import React, { FC } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logout } from '../../redux/reducers/authReducer'
import { getAuthUserId, getAuthUserPhoto } from '../../redux/selectors/authSelector'
import { AppStateType } from '../../redux/redux-store';
import { compose } from 'redux';
import { PhotosType } from '../../redux/types';

const HeaderContainer: FC<PropsType> = (props) => {
 
  return (
    <Header {...props} logout={props.logout} profilePhoto={props.profilePhoto} />
  )

}

type MapStateToPropsType = {
  login: string | null
  email: string | null
  id: number | null
  isAuth: boolean
  profilePhoto: PhotosType | null
}

type MapDispatchToPropsType = {
  logout: () => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    login: state.auth.login,
    email: state.auth.email,
    id: getAuthUserId(state),
    isAuth: state.auth.isAuth,
    profilePhoto: getAuthUserPhoto(state)
  }
}



export default compose<MapDispatchToPropsType & MapStateToPropsType & AppStateType>(connect(MapStateToProps, {logout})) (HeaderContainer)