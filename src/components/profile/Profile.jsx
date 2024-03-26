import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './profileInfo/ProfileInfo'

// import s from './Content.module.css'

export default function Profile(props) {
  const {isFetching, profileInfo, status, updateUserStatus, isOwner, savePhoto, updateProfileInfo, getUserProfile} = props
  
  return (
    <div>
      <ProfileInfo getUserProfile={getUserProfile} savePhoto={savePhoto} isOwner={isOwner} updateProfileInfo={updateProfileInfo} isFetching={isFetching} profileInfo={profileInfo} status={status} updateUserStatus={updateUserStatus}/>
      <MyPostsContainer/>
    </div>
  )
}
