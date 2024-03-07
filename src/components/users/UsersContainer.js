import React, { Component } from 'react'
import { connect } from "react-redux";
import { 
    followUser, 
    unfollowUser,
    setCurrentPage, 
    setTotalUsersCount, 
    setUsers, 
    toggleIsFetching,
    toggleIsFollowing,
    getUsers } from "../../redux/reducers/usersReducer";

import Users from './Users'


class UsersContainer extends Component {

    componentDidMount () {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    
    onFollow = (id) => {
        this.props.followUser(id)
    }

    onUnfollow = (id) => {
        this.props.unfollowUser(id)
    }
    
    onPageChanged = (currentPage) => {
        this.props.setCurrentPage(currentPage)
        this.props.getUsers(currentPage, this.props.pageSize)
    }

  render() {

    const {users, currentPage, totalUsersCount, pageSize, followingInProgress, isFetching} = this.props

    return (
        <Users
            users={users}
            currentPage={currentPage}
            isFetching={isFetching}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            followingInProgress={followingInProgress}
            onPageChanged={this.onPageChanged}
            onFollow={this.onFollow}
            onUnfollow={this.onUnfollow}
        />
    )
  }
}

const MapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(MapStateToProps, {
    followUser, 
    unfollowUser,
    setCurrentPage, 
    setTotalUsersCount, 
    setUsers, 
    toggleIsFetching, 
    toggleIsFollowing,
    getUsers

}) (UsersContainer)

