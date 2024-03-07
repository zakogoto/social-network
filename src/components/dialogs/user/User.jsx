import React from 'react'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'

export default function User({name, id}) {
  const activeLink = ({ isActive }) => isActive ? `${s.name} ${s.active}` : s.name
  

  return (
    <NavLink to={`/dialogs/${id}`} className={activeLink}>{name ? name : 'No name'}</NavLink>
  )
}
