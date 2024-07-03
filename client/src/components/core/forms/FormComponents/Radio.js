
import {ErrorMessage, Field, useField} from "formik"
import styles from '/styles/contact.module.css'

const RadioButton = (props) => {
    const {label, name, options, ...rest} = props
    
    return (
        <div>
            <label className={styles.form__radio__label}>{label}</label><br/>
            <Field name={name} {...rest}>
                {({field}) =>{
                    return options.map(option => {
                        return (
                            <React.Fragment key={option.key}>
                                <div className={styles.form__radio__cont}>
                                    <input
                                        className={styles.form__radio}
                                        type="radio"
                                        id={option.value}
                                        {...field}
                                        value={option.value}
                                        checked={field.value === option.value}
                                    />
                                    <label htmlFor={option.value} className={styles.form__radio}>{option.key}</label>
                                </div>
                            </React.Fragment>
                        )
                    })
                }}
            </Field>
            {/* <ErrorMessage name={name} component={TextError}/> */}
        </div>
    )
}


export default RadioButton