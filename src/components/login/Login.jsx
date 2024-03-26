import React from 'react'
import { reduxForm } from 'redux-form'
import { Input, createField } from '../../ui/validation/FormsControl'
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

const LoginForm = ({handleSubmit, error}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField(Input, 'email', 'login', 'email', [required, lengthLimits.login.min, lengthLimits.login.max])}
      {createField(Input, 'password', 'password', 'password', [required, lengthLimits.password.min, lengthLimits.password.max])}
      {createField(Input, 'checkbox', '', 'rememberMe', [], 'Remember Me')}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({form: 'login'}) (LoginForm)

const Login = ({login, isAuth}) => {
  
  const onSubmit = (formData) => {
    const {email, password, rememberMe} = formData;
    login(email, password, rememberMe)
  }

  if (isAuth) {
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