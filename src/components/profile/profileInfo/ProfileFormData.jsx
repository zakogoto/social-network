import React from 'react'
import { Input, Textarea, createField } from '../../../ui/validation/FormsControl'
import { reduxForm } from 'redux-form'
import { required } from '../../../ui/validation/validators'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getUserProfileInfo } from '../../../redux/selectors/profileSelector'
// import style from './ProfileInfo.module.css'

const ProfileForm = ({handleSubmit, error, initialValues}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h3>Full name</h3>
            {createField(Input, 'text', 'Name', 'fullName', [required])}
            <h3>About me</h3>
            {createField(Textarea, 'text', 'About me', 'aboutMe', [required])}
            {createField(Input, 'checkbox', '', 'lookingForAJob', [], 'Looking for a job?' )}
            <h3>Searching job description</h3>
            {createField(Textarea, 'text', "I'm looking for a...", 'lookingForAJobDescription', [])}
            <h3>Contacts</h3>
            {Object.entries(initialValues.contacts).map(contact => {
                return createField(Input, 'url', contact[0], `contacts.${contact[0]}`, [])
            })}
            <button>Save</button>
            {error? <div>{error.message}</div>: null}
        </form>
    )
}

const MapStateToProps = (state) => {
    return {
      initialValues: getUserProfileInfo(state)
    }
  }

export const ProfileReduxForm = compose(
    connect(MapStateToProps),
    reduxForm({form: 'edit-profile'})
    ) (ProfileForm)
