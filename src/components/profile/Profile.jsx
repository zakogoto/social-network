import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './profileInfo/ProfileInfo'

// import s from './Content.module.css'

export default function Profile(props) {
  // debugger
  return (
    <div>
      <ProfileInfo isFetching={props.isFetching} profileInfo={props.profileInfo} status={props.status} updateUserStatus={props.updateUserStatus}/>
      <MyPostsContainer/>
    </div>
  )
}
