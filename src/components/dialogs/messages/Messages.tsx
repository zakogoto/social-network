import React from 'react'
import { DialogType, MessagesType } from '../../../redux/types';
import Message from './message/Message';
import userPhoto from '../../../assets/image/userPhoto.png'
import style from '../Dialogs.module.css'

type Props = {
    // userId: number
    messagesData: Array<MessagesType>
    user: DialogType
}

export default function Messages({messagesData, user}: Props) {    
   if(messagesData.length > 0) {

    return (
        <>
            <div className={style.dialogHeader}>
                <div>{user.userName}</div>
                <img src={user.photos.small ? user.photos.small : userPhoto} alt="" />
            </div>
            <div className={style.messages}>
                {messagesData.map(m => <Message messageData={m} key={m.id}/>)}
            </div>
        </>
      )
    } else {
        return (
            <div>No messages</div>
        )
    }
}