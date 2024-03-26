import React, { useEffect } from 'react'
import { compose } from 'redux';
import { connect } from "react-redux";
import { 
    followUser, 
    unfollowUser,
    setCurrentPage,
    setUsers, 
    toggleIsFetching,
    toggleIsFollowing,
    requestUsers } from "../../redux/reducers/usersReducer";
import Users from './Users'
import { getCurrentPage, getFollowingProgress, getIsFetching, getPageSize, getPortionSize, getTotalUserCount, getUsers } from '../../redux/selectors/userSelector';

const  UsersContainer = (props) => {
    
    let {users, currentPage, totalUsersCount, 
        pageSize, followingInProgress, isFetching, 
        requestUsers, setCurrentPage, unfollowUser, followUser, portionSize} = props

    useEffect(() => {
        requestUsers(currentPage, pageSize)
        // eslint-disable-next-line
    }, [currentPage])
    
    const onPageChanged = (currentPage) => {
        setCurrentPage(currentPage)
        requestUsers(currentPage, pageSize)
    }

    return (
        <Users
            users={users}
            currentPage={currentPage}
            isFetching={isFetching}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            portionSize={portionSize}
            followingInProgress={followingInProgress}
            onPageChanged={onPageChanged}
            onFollow={followUser}
            onUnfollow={unfollowUser}
        />
    )
}

const MapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsersCount: getTotalUserCount(state),
        pageSize: getPageSize(state),
        portionSize: getPortionSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingProgress(state)
    }
}

export default compose(
    connect(MapStateToProps, {
        followUser, 
        unfollowUser,
        setCurrentPage,
        setUsers, 
        toggleIsFetching, 
        toggleIsFollowing,
        requestUsers
    })
) (UsersContainer)

