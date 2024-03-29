import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import defaultPhoto from "../../assets/image/userPhoto.png"

export default function Header({isAuth, login, logout, profilePhoto}) {
  return (
    <header className={s.header}>
        <NavLink to="/">
            <img src='https://one-pieces.ru/wp-content/uploads/2022/02/one-piece-logo-700x394-1.png' alt="logo" />
        </NavLink>
        {isAuth 
          ? <div className={s.loginBlock} >
              <span className={s.infoBlock} >
                { !profilePhoto 
                ? 
                  <img src={defaultPhoto} alt="mini avatar" />
                :
                  <img src={profilePhoto.small} alt='ownerAvatar' />
              }
                
                <span className={s.login}>{login}</span>
              </span>
            <button className={s.logoutBtn} onClick={logout}>Log out</button>
            </div> 
          : <NavLink className={s.loginBtn} to={'/login'}>login</NavLink>
        }
    </header>
  )
}
