import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'
import { DialogType, PhotosType } from '../../../redux/types';
import userPhoto from '../../../assets/image/userPhoto.png'

type UserPropsType = {
  user: DialogType
  name: string,
  id: number,
  photos: PhotosType
  getAllMessagesWithUser: (userId: number, user: DialogType) => void
}

const User: React.FC<UserPropsType> = ({name, id, photos, getAllMessagesWithUser, user}) => {
  const activeLink = ({ isActive }:{isActive: boolean}) => isActive ? `${s.name} ${s.active}` : s.name

  const getListOfMessages = () => {
    console.log(id)
    getAllMessagesWithUser(id, user)
  }
  
  return (
    <NavLink to={`/dialogs/${id}`} className={activeLink} onClick={getListOfMessages} >
      <img className={s.photo} src={photos.small || userPhoto} alt="" />
      <div>{name ? name : 'No name'}</div>
    </NavLink>
  )
}

export default  User