import React from 'react'

import defaultPhoto from "../../../assets/image/userPhoto.png"
import Preloader from '../../../ui/Preloader'

import style from './ProfileInfo.module.css'
import ProfileStatus from './profileStatus/ProfileStatus'

export default function ProfileInfo(props) {
    if (!props.profileInfo) {
        return <Preloader/>
    }

    const contacts = Object.entries(props.profileInfo.contacts).map(contact => {
            return (
            <a href={contact[1]}>{contact[0]}</a>
            )
        })

    
    
  return (
    <div >
        {props.isFetching ? <Preloader/> :
            <div className={style.wrap}>
                <img className={style.profilePhoto} src={props.profileInfo.photos.large != null ? props.profileInfo.photos.large : defaultPhoto} alt="profile" />
                <div className={style.profileInfo}>
                    <h2 className={style.profileName}>{props.profileInfo.fullName}</h2>
                    <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} key={props.id}/>
                    <div className={style.contacts}>
                        {contacts}
                    </div>
                </div>
            </div>
        }
    </div>
   
  )
}
