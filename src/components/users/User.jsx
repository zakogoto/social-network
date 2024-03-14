import s from './Users.module.css'
import React from 'react'
import userPhoto from '../../assets/image/userPhoto.png'
import { NavLink } from 'react-router-dom';

export default function User({followingInProgress, onUnfollow, onFollow, user}) {

    return (
        <div className={s.user} key={user.id}>
            <div className={s.userPreview}>
                {/* <NavLink to={`/profile/${user.id}`}> */}
                <NavLink to={`/profile/${user.id}`} >
                    <img src={user.imgURL ? user.imgURL : userPhoto} alt={user.name} />
                </NavLink>
                {user.followed ? 
                    <button 
                        disabled={followingInProgress.some(id => id === user.id)} 
                        onClick={() => onUnfollow(user.id)} className={`${s.btn} ${s.followed}`}
                    >
                        UNFOLLOW
                    </button> 
                    : 
                    <button 
                        disabled={followingInProgress.some(id => id === user.id)} 
                        onClick={()=> onFollow(user.id)} className={s.btn}
                    >
                        FOLLOW
                    </button>
                }
            </div>
            <div className={s.userInfo}>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status ? user.status : 'no status'}</div>
                </span>
                <span>
                    {/* <div>{user.location.city ? user.location.city : 'no info'}</div> */}
                    {/* <div>{user.location.country ? user.location.country : 'no info'}</div> */}
                </span>
            </div>
        </div>
    )
}
