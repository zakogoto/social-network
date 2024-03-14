import style from './Users.module.css'
import React from 'react'
import Preloader from '../../ui/Preloader';
import Pagination from '../../ui/pagination/Pagination';
import User from './User';

export default function Users(props) {

    const {totalUsersCount, pageSize, users, 
        isFetching, onPageChanged, currentPage, 
        onUnfollow, onFollow, followingInProgress, portionSize} = props;

    return (
        <div className={style.wrap}>
            {isFetching ? 
                <Preloader/> 
                : users.map(u => 
                    <User followingInProgress={followingInProgress} onUnfollow={onUnfollow} onFollow={onFollow} user={u} key={u.id} /> 
                )
            }
            <span>
                <Pagination portionSize={portionSize} pageSize={pageSize} totalItemsCount={totalUsersCount} onPageChanged={onPageChanged} currentPage={currentPage}/>
            </span>
        </div>
    )
}
