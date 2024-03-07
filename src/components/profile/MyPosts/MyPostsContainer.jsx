import MyPosts from './MyPosts'
import {  addNewPost } from '../../../redux/reducers/profileReducer'
import { connect } from 'react-redux'


const MapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPost: state.profilePage.newPost,
  }
}



const MyPostsContainer = connect(MapStateToProps, {
  addNewPost,
}) (MyPosts)

export default MyPostsContainer