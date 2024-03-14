import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './profileInfo/ProfileInfo'

// import s from './Content.module.css'

export default function Profile(props) {
  const {isFetching, profileInfo, status, updateUserStatus} = props
  
  return (
    <div>
      <ProfileInfo isFetching={isFetching} profileInfo={profileInfo} status={status} updateUserStatus={updateUserStatus}/>
      <MyPostsContainer/>
    </div>
  )
}
