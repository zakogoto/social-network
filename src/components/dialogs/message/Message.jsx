import React from 'react'
import s from './Message.module.css'

export default function Message(props) {

  const incomingMessage = (
    <div className={s.wrap}>
      <div>
        <img src="https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg" alt={`${props.name} avatar`} />
        <h3>{props.name}</h3>
      </div>
      <p className={s.message}>{props.message? props.message : 'hello'}</p>
    </div>
  )

  const myMessage = (
    <div className={s.wrapRight}>
    <p className={s.message}>{props.message? props.message : 'hello'}</p>
    <div>
      <img src="https://animego.org/media/cache/thumbs_60x60/upload/avatar/652797ce3668d760496455.jpeg" alt={`${props.name} avatar`} />
      <h3>{props.name}</h3>
    </div>
  </div>
  )

  return props.income ? incomingMessage : myMessage
}
