import React from 'react'
import Post from './post/Post'
import s from './MyPosts.module.css'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator} from '../../../ui/validation/validators'
import { Textarea } from '../../../ui/validation/FormsControl'

const maxLength50 = maxLengthCreator(50)

const PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={s.item} >
      <Field component={Textarea} name='newPost' validate={[maxLength50]} placeholder='New posts' />
      <button className={s.btn}>Post</button>
    </form>
  )
}

const PostReduxForm = reduxForm({form: 'post'}) (PostForm)

export default function MyPosts(props) {
  
  const onSubmit = (postData) => {
    props.addNewPost(postData.newPost)
  }
  const posts = props.postsData.map((p, i) => <Post post={p.post} name={p.name} imgSrc={p.imgSrc} key={i}/>)

  return (
    <div className={s.wrap}>
        <PostReduxForm onSubmit={onSubmit}/>
        <div>
            {posts}
        </div>
    </div>
  )
}
