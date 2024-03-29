import React, { useState } from 'react'
import style from './ProfileInfo.module.css'

import defaultPhoto from "../../../assets/image/userPhoto.png"
import Preloader from '../../../ui/Preloader'
import ProfileStatus from './profileStatus/ProfileStatus'

import ProfileData from './ProfileData'
import { ProfileReduxForm } from './ProfileFormData'


export default function ProfileInfo(props) {

    const  {profileInfo, status, updateUserStatus, id, isFetching, isOwner, savePhoto, updateProfileInfo} = props;

    let [editMode, setEditMode] = useState(false)

    const handleSavePhoto = (e) => {
        if(e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }
    const handleEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (data) => {
        updateProfileInfo(data)
        setEditMode(false)
    }

    if (!profileInfo) {
        return <Preloader/>
    }
  return (
    <div >
        {isFetching ? <Preloader/> :
            <div className={style.wrap}>
                <div>
                    <img className={style.profilePhoto} src={profileInfo.photos.large ? profileInfo.photos.large : defaultPhoto} alt="profile" />
                    {isOwner? <input type="file" onChange={handleSavePhoto} /> : null}
                    {editMode 
                        ? <ProfileReduxForm initialValues={profileInfo} onSubmit={onSubmit} profileInfo={profileInfo} /> 
                        : <ProfileData profileInfo={profileInfo} isOwner={isOwner} handleEditMode={handleEditMode} />
                    }
                </div>
                <div className={style.profileInfo}>
                    <h2 className={style.profileName}>{profileInfo.fullName}</h2>
                    <ProfileStatus isOwner={isOwner} status={status} updateUserStatus={updateUserStatus} key={id}/>
                </div>
            </div>
        }
    </div>   
  )
}