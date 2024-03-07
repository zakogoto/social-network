import React from 'react'
import styles from './FormsControl.module.css'

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

// export const Textarea = ({input, meta, ...otherProps}) => {

//     const errorMessage = meta.error && meta.touched;

//     return (
//         <div className={errorMessage ? styles.error : styles.formControl}>
//             <textarea {...input} {...meta} {...otherProps} />
//             {errorMessage && <span className={styles.errorMessage}>{meta.error}</span>}
//         </div>
//     )
// }