import React from 'react'
import styles from './FormsControl.module.css'
import { Field } from 'redux-form';

const Element = (Element) => ({input, meta, ...props}) => {
    // const {input, meta, ...props} = props
    const errorMessage = meta.error && meta.touched;

    return (
        <div className={errorMessage ? styles.error : styles.formControl}>
            <Element {...input} {...meta} {...props}/>
            {errorMessage && <span className={styles.errorMessage}>{meta.error}</span>}
        </div>
    )
}

export const Input = Element('input') 
export const Textarea = Element('textarea') 

export const createField = (component, type, placeholder, name, validators, text='') => {
    return ( 
        <div>
            <Field component={component} type={type} placeholder={placeholder} name={name} validate={validators} />
            <span>
                {text}
            </span>
        </div>
    )
}