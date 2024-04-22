import React, { FC, useEffect } from 'react'
import { compose } from 'redux';
import { connect } from "react-redux";
import { 
    followUser, 
    unfollowUser,
    setCurrentPage,
    requestUsers } from "../../redux/reducers/usersReducer";
import { getCurrentPage, 
    getFollowingProgress, 
    getIsFetching, 
    getPageSize, 
    getPortionSize, 
    getTotalUserCount, 
    getUsers } from '../../redux/selectors/userSelector';
import { UserType } from '../../redux/types';
import Users from './Users'
import { AppStateType } from '../../redux/redux-store';

type MapStateToPropsType = {
    users: Array<UserType>
    totalUsersCount: number | null,
    pageSizeNumber: number,
    portionSize: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

type MapDispatchToPropsType = {
    followUser: (id: number) => void,
    unfollowUser: (id: number) => void,
    setCurrentPage: (PageNumber: number) => void,
    requestUsers: (page: number, pageSizeNumber: number) => void,
}

type OwnPropsType = {
    onPageChanged: (currentPage: number) => void
}

type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

const UsersContainer: FC<PropsType> = (props) => {
    
    let {users, currentPage, totalUsersCount, 
        pageSizeNumber, followingInProgress, isFetching, 
        requestUsers, setCurrentPage, unfollowUser, followUser, portionSize} = props

    useEffect(() => {
        requestUsers(currentPage, pageSizeNumber)
        // eslint-disable-next-line
    }, [currentPage])
    
    const onPageChanged = (currentPage: number) => {
        setCurrentPage(currentPage)
        requestUsers(currentPage, pageSizeNumber)
    }

    return (
        <Users
            users={users}
            currentPage = {currentPage}
            isFetching={isFetching}
            totalUsersCount={totalUsersCount}
            pageSizeNumber={pageSizeNumber}
            portionSize={portionSize}
            followingInProgress={followingInProgress}
            onPageChanged={onPageChanged}
            onFollow={followUser}
            onUnfollow={unfollowUser}/>
    )
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUserCount(state),
        pageSizeNumber: getPageSize(state),
        portionSize: getPortionSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingProgress(state)
    }
}

export default compose <MapDispatchToPropsType & MapStateToPropsType & OwnPropsType & AppStateType>(
    connect(MapStateToProps, {
        followUser, 
        unfollowUser,
        setCurrentPage,
        requestUsers
    })
) (UsersContainer)