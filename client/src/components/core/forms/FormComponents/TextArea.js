import React from "react"
import {useField} from "formik"
import styles from '/styles/contact.module.css'

const TextArea = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return <div className={styles.textArea__container}>
        <label htmlFor={props.id || props.name}>{label}</label>
        <textarea className="textArea" {...field} {...props} />
        {meta.error && meta.touched ? (
            <div className={styles.form__error}>{meta.error}</div>
        ) : null}
    </div>
}

export default TextArea