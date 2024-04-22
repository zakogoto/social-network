import style from './Users.module.css'
import React, { FC } from 'react'
import Preloader from '../../ui/Preloader';
import Pagination from '../../ui/pagination/Pagination';
import User from './User';
import { UserType } from '../../redux/types';

type PropsType = {
    users: Array<UserType>, 
    totalUsersCount: number | null,
    pageSizeNumber: number, 
    isFetching: boolean, 
    currentPage: number, 
    portionSize: number,
    followingInProgress: Array<number>, 
    onPageChanged: (pageNumber: number) => void, 
    onUnfollow: (id: number) => void, 
    onFollow: (id: number) => void, 
}

const Users: FC<PropsType> = (props) => {

    const {totalUsersCount, pageSizeNumber, users, 
        isFetching, onPageChanged, currentPage, 
        onUnfollow, onFollow, followingInProgress, portionSize} = props;

    return (
        <div className={style.wrap}>
            {isFetching ? 
                <Preloader/> 
                : <div className={style.users}>
                    {users.map(u => 
                    <User followingInProgress={followingInProgress} onUnfollow={onUnfollow} onFollow={onFollow} user={u} key={u.id} /> 
                )}
                </div>
            }
                <Pagination propClassName={style.paginator} portionSize={portionSize} pageSizeNumber={pageSizeNumber} totalItemsCount={totalUsersCount} onPageChanged={onPageChanged} currentPage={currentPage}/>
        </div>
    )
}

export default Users
