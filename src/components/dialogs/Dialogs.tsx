import React, { FC, HTMLInputTypeAttribute, useEffect } from 'react'
import User from './user/User'
import s from './Dialogs.module.css'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../ui/validation/FormsControl'
import { DialogType, MessagesType } from '../../redux/types';
import Messages from './messages/Messages';
import { RouterPropsType } from '../../hooks/withRouter';

const DialogForm : FC<DialogFormPropsType> = ({handleSubmit}) => {
 
  return (
    <form onSubmit={handleSubmit} className={s.newMessage}>
      <Field component={Textarea} placeholder='Enter your message...' name="newMessage" className={s.newMessageBody} />
      <button>Send</button>
    </form>
  )
}

const DialogReduxForm = reduxForm({form: 'dialogs'}) (DialogForm)

type DialogsPropsType = {
  dialogs: Array<DialogType>
  messagesData: Array<MessagesType>
  activeDialog: DialogType
  sendNewMessage: (message: string, userId: number) => void
  getListOfAllDialogs: () => void
  getAllMessagesWithUser: (userId: number, user: DialogType) => void
}

type DialogFormPropsType = {
  handleSubmit: () => void
}

const Dialogs: FC<DialogsPropsType & RouterPropsType> = ({router, getListOfAllDialogs, activeDialog, dialogs, getAllMessagesWithUser, messagesData, sendNewMessage}) => {

  useEffect(()=> {
    getListOfAllDialogs()
  }, [messagesData])
  
  const users = dialogs.map((user)=> <User getAllMessagesWithUser={getAllMessagesWithUser} user={user} name={user.userName} id={user.id} key={user.id} photos={user.photos}/>)

  const onSubmit = (value: any) => {
    if(activeDialog) {
      sendNewMessage(value.newMessage, activeDialog.id)
    }
  }

  return (
    <div className={s.wrap}>
        <div className={s.dialogs}>
          <div className={s.dialogItems}>
            {users}
          </div>
        </div>
        <div className={s.messages}>
          <div className={s.messagesArea}>
            {activeDialog ? 
            <Messages user={activeDialog} messagesData={messagesData} key={'messages'} />
            : "No selected dialog"}
          </div>
            <DialogReduxForm onSubmit={onSubmit} />
        </div>
    </div>
  )
}

export default Dialogs