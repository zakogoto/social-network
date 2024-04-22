import React, { FC } from 'react'
import userPhoto from '../../assets/image/userPhoto.png'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../redux/types';
import s from './Users.module.css'

type PropsType = {
    followingInProgress: Array<number>
    onUnfollow: (id: number) => void
    onFollow: (id: number) => void
    user: UserType
}

const User: FC<PropsType> = ({followingInProgress, onUnfollow, onFollow, user}) => {

    const status = user.status && user.status.length > 50 ? user.status.slice(0, 50) + '...' : user.status

    return (
        <div className={s.user} key={user.id}>
            <div className={s.userPreview}>
                {/* <NavLink to={`/profile/${user.id}`}> */}
                <NavLink to={`/profile/${user.id}`} >
                    <img src={user.photos.small ? user.photos.small : userPhoto} alt={user.name} />
                </NavLink>
            </div>
            <div className={s.userInfoWrap}>
                <div className={s.userInfo}>
                    <div className={s.name}>{user.name}</div>
                    <div>{status ? status : 'no status'}</div>
                    <div className={s.btns}>
                        {user.followed ? 
                            <button 
                            disabled={followingInProgress.some( id => id === user.id)} 
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
                        <NavLink to={`../dialogs/${user.id}`} className={`${s.btn} ${s.sendBtn}`}>SEND MESSAGE</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User