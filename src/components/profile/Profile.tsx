import React, { FC } from 'react'
import ProfileInfo from './profileInfo/ProfileInfo'
import Preloader from '../../ui/Preloader'
import MyPosts from './MyPosts/MyPosts'
import { PostType, ProfileType } from '../../redux/types';

// import s from './Content.module.css'
type PropsType = {
  profileInfo: ProfileType | null
  postsData: Array<PostType>
  isFetching: boolean
  status: string
  isOwner: boolean
  updateUserStatus: (status: string) => void
  savePhoto: (photos: any) => void
  updateProfileInfo: (formData: ProfileType) => void
  getUserProfile:(userId: number) => void
  addNewPost: (message: string) => void
}
const Profile: FC<PropsType> = (props: PropsType) => {
  const {isFetching, profileInfo, status, updateUserStatus, isOwner, savePhoto, updateProfileInfo, getUserProfile, addNewPost, postsData} = props
  

  if (!profileInfo) {
    return <Preloader />
  }
  
  return (
    <div>
      <ProfileInfo getUserProfile={getUserProfile} savePhoto={savePhoto} isOwner={isOwner} updateProfileInfo={updateProfileInfo} isFetching={isFetching} profileInfo={profileInfo} status={status} updateUserStatus={updateUserStatus}/>
      <MyPosts addNewPost={addNewPost} postsData={postsData} />
    </div>
  )
}
export default Profile