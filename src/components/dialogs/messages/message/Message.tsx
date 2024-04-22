import React, { FC } from 'react'
import s from './Message.module.css'
import { MessagesType } from '../../../../redux/types';

type PropsType = {
  messageData: MessagesType
}

const Message: FC<PropsType> = ({messageData}) => {

  const date = new Date(Date.parse(messageData.addedAt))

  const time = {
    hours: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
    minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
  }

  return (
    <div className={messageData.senderId === messageData.recipientId ? s.wrap: s.wrapRight}>
      {/* <div>
        {/* <img src={messageData.} alt={`${props.name} avatar`} />
      </div> */}
      <div className={s.message}>
        <h4 className={s.senderName}>{messageData.senderName}</h4>
        <h3 className={s.messageBody}>{messageData.body}</h3>
        <h5 className={s.messageTime}>{time.hours}:{time.minutes}</h5>
      </div>
    </div>
  )
}

export default Message