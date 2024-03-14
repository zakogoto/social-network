import MyPosts from './MyPosts'
import {  addNewPost } from '../../../redux/reducers/profileReducer'
import { connect } from 'react-redux'
import { getNewPostData, getUserPosts } from '../../../redux/selectors/profileSelector'


const MapStateToProps = (state) => {
  return {
    postsData: getUserPosts(state),
    newPost: getNewPostData(state),
  }
}



const MyPostsContainer = connect(MapStateToProps, {
  addNewPost,
}) (MyPosts)

export default MyPostsContainer