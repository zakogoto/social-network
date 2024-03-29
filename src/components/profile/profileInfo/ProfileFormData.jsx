import React from 'react'
import { Input, Textarea, createField } from '../../../ui/validation/FormsControl'
import { reduxForm } from 'redux-form'
import { required } from '../../../ui/validation/validators'
// import style from './ProfileInfo.module.css'

const ProfileForm = ({handleSubmit, error, profileInfo}) => {
    return (
        <form onSubmit={handleSubmit}>
            <h3>Full name</h3>
            {createField(Input, 'text', 'Name', 'fullName', [required])}
            <h3>About me</h3>
            {createField(Textarea, 'text', 'About me', 'aboutMe', [required])}
            {createField(Input, 'checkbox', '', 'lookingForAJob', [], 'Looking for a job?' )}
            <h3>My skills</h3>
            {createField(Textarea, 'text', "I'm looking for a...", 'lookingForAJobDescription', [])}
            <h3>Contacts</h3>
            {Object.keys(profileInfo.contacts).map(key => {
                return (
                    <b>{key}: {createField(Input, 'url', key, `contacts.${key}`, [])}</b>
                )
            })}
            <button>Save</button>
            {error? <div>{error.message}</div>: null}
        </form>
    )
}

export const ProfileReduxForm = 
    reduxForm({form: 'edit-profile'}) (ProfileForm)
