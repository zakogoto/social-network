import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './profileInfo/ProfileInfo'
import Preloader from '../../ui/Preloader'

// import s from './Content.module.css'

export default function Profile(props) {
  const {isFetching, profileInfo, status, updateUserStatus, isOwner, savePhoto, updateProfileInfo, getUserProfile} = props
  

  if (!profileInfo) {
    return <Preloader />
  }
  
  return (
    <div>
      <ProfileInfo getUserProfile={getUserProfile} savePhoto={savePhoto} isOwner={isOwner} updateProfileInfo={updateProfileInfo} isFetching={isFetching} profileInfo={profileInfo} status={status} updateUserStatus={updateUserStatus}/>
      <MyPostsContainer/>
    </div>
  )
}
