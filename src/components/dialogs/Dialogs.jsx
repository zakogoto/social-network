import React from 'react'
import User from './user/User'
import Message from './message/Message'
import s from './Dialogs.module.css'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../ui/validation/FormsControl'

const DialogForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.newMessage}>
      <Field component={Textarea} placeholder='Enter your message...' name="newMessage" />
      <button>Send</button>
    </form>
  )
}

const DialogReduxForm = reduxForm({form: 'dialogs'}) (DialogForm)

export default function Dialogs(props) {
  // const newMessageElement = React.createRef();
  
  const users = props.usersData.map((user, i)=> <User name={user.name} id={i+1} key={user.id}/>)
  const messages = props.messagesData.map((m, i)=> <Message message={m.message} name={m.name} income={m.income} key={i}/>)
  
  const onSubmit = (value) => {
    props.sendNewMessage(value.newMessage)
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
            {messages}
          </div>
            <DialogReduxForm onSubmit={onSubmit} />
        </div>
    </div>
  )
}
