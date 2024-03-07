import s from './Users.module.css'

import React from 'react'
import userPhoto from '../../assets/image/userPhoto.png'
import Preloader from '../../ui/Preloader';
import { NavLink } from 'react-router-dom';
export default function Users(props) {
    
    const pagesCount  = Math.ceil(props.totalUsersCount / props.pageSize);
    
    const pages = [];
    
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const user = props.users.map(u => 
        <div className={s.user} key={u.id}>
            <div className={s.userPreview}>
                {/* <NavLink to={`/profile/${u.id}`}> */}
                <NavLink to={`/profile/${u.id}`} >
                    <img src={u.imgURL ? u.imgURL : userPhoto} alt={u.name} />
                </NavLink>
                {u.followed ? 
                    <button 
                        disabled={props.followingInProgress.some(id => id === u.id)} 
                        onClick={() => props.onUnfollow(u.id)} className={`${s.btn} ${s.followed}`}
                    >
                        UNFOLLOW
                    </button> 
                    : 
                    <button 
                        disabled={props.followingInProgress.some(id => id === u.id)} 
                        onClick={()=> props.onFollow(u.id)} className={s.btn}
                    >
                        FOLLOW
                    </button>
                }
            </div>
            <div className={s.userInfo}>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status ? u.status : 'no status'}</div>
                </span>
                <span>
                    {/* <div>{u.location.city ? u.location.city : 'no info'}</div> */}
                    {/* <div>{u.location.country ? u.location.country : 'no info'}</div> */}
                </span>
            </div>
        </div>
    )

    return (
        <div className={s.wrap}>
            {props.isFetching ? <Preloader/> : user}
            
            <span>
                {pages.map(page => {
                    return <button 
                    className={props.currentPage === page ? s.currentPage : ''}
                    onClick={() => props.onPageChanged(page)}>{page}</button>
                })}
            </span>
        </div>
    )
}
