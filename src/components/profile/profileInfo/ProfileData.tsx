import React, { FC } from 'react'
import style from './ProfileInfo.module.css'
import { ProfileType } from '../../../redux/types';

type PropsType = {
    profileInfo: ProfileType,
    isOwner: boolean
    handleEditMode: () => void
}

const ProfileData: FC<PropsType> = (props) => {

    const  {profileInfo, isOwner, handleEditMode } = props;

    const contacts = Object.entries(profileInfo.contacts).map(contact => {
        return (
        <div key={contact[0]}> <b>{contact[0]}</b>: <a href={contact[1]}>{contact[1] ? contact[1] : 'none'}</a></div>
        )
    })

  return (
    <div className={style.contacts}>
        {isOwner ? <button onClick={handleEditMode}>Edit</button> : null}
        <div>
            <b>About Me: </b>
            {profileInfo.aboutMe ? profileInfo.aboutMe : 'No data'}
        </div>
        <div><b>Looking for a job: </b>{profileInfo.lookingForAJob ? "Yes" : 'No'}</div>
        { profileInfo.lookingForAJobDescription
            ?
                <div>
                    <b> skills: </b>
                    {profileInfo.lookingForAJobDescription}
                </div>
            : null
        }
        {contacts}
    </div>
  )
}

export default ProfileData