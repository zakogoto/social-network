import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input } from '../../ui/validation/FormsControl'
import { maxLengthCreator, minLengthCreator, required } from '../../ui/validation/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/reducers/authReducer'
import { Navigate } from 'react-router-dom'
import styles from '../../ui/validation/FormsControl.module.css'

const lengthLimits = { 
  login: {
    min: minLengthCreator(3),
    max: maxLengthCreator(20)},
  password: {
    min: minLengthCreator(8),
    max: maxLengthCreator(20)
  },
}

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={Input} type="input" placeholder='login' name='email' validate={[required, lengthLimits.login.min, lengthLimits.login.max]} />
        </div>
        <div>
          <Field component={Input} type="password" placeholder='password' name='password' validate={[required, lengthLimits.password.min, lengthLimits.password.max]} />
        </div>
        <div>
          <Field component={Input} type="checkbox" name='rememberMe'/> 
          <span>remember me</span>
        </div>
        {props.error && <div className={styles.errorMessage}>{props.error}</div>}
        <div>
          <button>Login</button>
        </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)


const Login = (props) => {
  
  const onSubmit = (formData) => {
    const {email, password, rememberMe} = formData;
    props.login(email, password, rememberMe)
  }

  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div style={{padding: '20px'}}>
      <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
  )
}

const MapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(MapStateToProps, {login}) (Login)