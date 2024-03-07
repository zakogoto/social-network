import React from 'react'
import s from "./Navbar.module.css"
import { NavLink } from 'react-router-dom'

export default function Navbar(props) {
 
  const friends = props.sideBarData.friends.map((f, i)=> 
    <div key={i}>
      <img src={f.src} alt={`${f.name} avatar`} className={s.friendImg}/>
      <div className={s.friendName}>{f.name}</div>
    </div>
  )

  // const profileLink = props.isAuth ? props.id : 2

  const activeLink = ({ isActive }) => isActive ? s.active : ""
  return (
    <nav className={s.links}>
      <NavLink className={activeLink} to={`/profile`}>Profile</NavLink>
      <NavLink className={activeLink} to="/dialogs">Messages</NavLink>
      <NavLink className={activeLink} to="/users">Friends</NavLink>
      <NavLink className={activeLink} to="/music">Music</NavLink>
      <div className={s.friends}>
        {friends}
      </div>
    </nav>
  )
}