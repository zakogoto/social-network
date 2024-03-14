import React from 'react'

import defaultPhoto from "../../../assets/image/userPhoto.png"
import Preloader from '../../../ui/Preloader'

import style from './ProfileInfo.module.css'
import ProfileStatus from './profileStatus/ProfileStatus'

export default function ProfileInfo(props) {

    const  {profileInfo, status, updateUserStatus, id, isFetching} = props
    if (!profileInfo) {
        
        return <Preloader/>
    }

    const contacts = Object.entries(profileInfo.contacts).map(contact => {
            return (
            <a href={contact[1]}>{contact[0]}</a>
            )
        })
    
  return (
    <div >
        {isFetching ? <Preloader/> :
            <div className={style.wrap}>
                <img className={style.profilePhoto} src={profileInfo.photos.large != null ? profileInfo.photos.large : defaultPhoto} alt="profile" />
                <div className={style.profileInfo}>
                    <h2 className={style.profileName}>{profileInfo.fullName}</h2>
                    <ProfileStatus status={status} updateUserStatus={updateUserStatus} key={id}/>
                    <div className={style.contacts}>
                        {contacts}
                    </div>
                </div>
            </div>
        }
    </div>
   
  )
}
