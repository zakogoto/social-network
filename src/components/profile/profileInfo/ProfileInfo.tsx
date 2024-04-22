import React, { ChangeEvent, FC, useState } from 'react'
import style from './ProfileInfo.module.css'

import defaultPhoto from "../../../assets/image/userPhoto.png"
import Preloader from '../../../ui/Preloader'

import ProfileData from './ProfileData'
import { ProfileReduxForm } from './ProfileFormData'
import { ProfileType } from '../../../redux/types';
import ProfileStatus from './profileStatus/ProfileStatus';


type PropsType = {
    profileInfo: ProfileType,
    isFetching: boolean
    status: string
    isOwner: boolean
    updateUserStatus: (status: string) => void
    savePhoto: (photos: any) => void
    updateProfileInfo: (formData: ProfileType) => void
    getUserProfile:(userId: number) => void
}

const ProfileInfo: FC<PropsType> = (props) => {

    const  {profileInfo, status, updateUserStatus, isFetching, isOwner, savePhoto, updateProfileInfo} = props;

    let [editMode, setEditMode] = useState(false)

    const handleSavePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target && e.target.files) {
            savePhoto(e.target.files[0])
        }
    }
    const handleEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (data: ProfileType) => {
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
                    <img className={style.profilePhoto} src={profileInfo.photos?.large || defaultPhoto} alt="profile" />
                    {isOwner? <input type="file" onChange={handleSavePhoto} /> : null}
                    {editMode 
                        ? <ProfileReduxForm initialValues={profileInfo} onSubmit={onSubmit} profileInfo={profileInfo} /> 
                        : <ProfileData profileInfo={profileInfo} isOwner={isOwner} handleEditMode={handleEditMode} />
                    }
                </div>
                <div className={style.profileInfo}>
                    <h2 className={style.profileName}>{profileInfo.fullName}</h2>
                    <ProfileStatus  isOwner={isOwner} status={status} updateUserStatus={updateUserStatus} key={profileInfo.id}/>
                </div>
            </div>
        }
    </div>   
  )
}

export default ProfileInfo