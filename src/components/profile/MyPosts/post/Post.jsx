import React from 'react'
import s from './Post.module.css'

export default function Post(props) {
  
  const {imgSrc, name, post, count} = props

  return (
    <div className={s.wrap}>
        <div className={s.item}>
          <img src={imgSrc} alt={name} className={s.img}/>
          <div className={s.desc}>
              <h3 className={s.name}>{name}</h3>
              <p className={s.post}>{post}</p>
          </div>
        </div>
        <span>Likes: {count ? count : 0}</span>
    </div>
  )
}
