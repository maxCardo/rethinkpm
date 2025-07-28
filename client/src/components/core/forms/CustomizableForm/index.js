import  { useState } from 'react'
import styles from "./form.module.css";
import Select from "react-select";
import { isDictEmpty } from '../../../../util/commonFunctions';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

// Notice to changes: used MUI components for radio 

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

const CustomizableForm = ({ stepsMapping, currentStep, title, handleSubmit, getFormErrs, isLoading }) => {
    const [currentStepErrs, setCurrentStepErrs] = useState({})

    const checkStepErrors = () => {
        const fieldsToValidate = stepsMapping?.[currentStep]?.fields?.map(input => input.name) || []
        if (getFormErrs && fieldsToValidate.length) {
            const errs = getFormErrs(fieldsToValidate)
            setCurrentStepErrs(errs || {})
            return isDictEmpty(errs)
        }
      
        setCurrentStepErrs({})
        return true
    }

    const renderFields = (fields) => {
        if (fields?.length) {
            return fields.map((field, index) => {
                switch (field.type) {
                    case 'text':
                    case 'date':
                    case 'file':
                        return (
                            <div key={index} className={classNames(styles.inputContainer, field.halfWidth && styles.halfWidth)}>
                                {field.startContent && (
                                    <p>{field.startContent}</p>
                                )}
                                <label>{field.label}</label>
                                <input
                                    type={field.type}
                                    value={field.value || ''}
                                    name={field.name}
                                    onChange={(e) => field.handleChange(e)}
                                />
                                <span className={styles.errorHelperText}>{currentStepErrs[field.name]}</span>
                                {field.endContent && (
                                    <p className={styles.endContent}>{field.endContent}</p>
                                )}
                            </div>
                        );
            
                    case 'textArea':
                        return (
                            <div key={index} className={classNames(styles.inputContainer, field.halfWidth && styles.halfWidth)}>
                                {field.startContent && (
                                    <p>{field.startContent}</p>
                                )}
                                <div className={styles.textArea__container}>
                                    <label htmlFor={field.label}>{field.label}</label>
                                    <textarea
                                        className="textArea"
                                        name={field.name}
                                        rows="5"
                                        placeholder={field.placeholder}
                                        meta={field.name}
                                        onChange={(e) => field.handleChange(e)}
                                    />
                                    <span className={styles.errorHelperText}>{currentStepErrs[field.name]}</span>
                                </div>
                                {field.endContent && (
                                    <p>{field.endContent}</p>
                                )}
                            </div>
                        );
        
                    case 'select':
                        return (
                            <div key={index} className={classNames(styles.inputContainer, field.halfWidth && styles.halfWidth)}>
                                {field.startContent && (
                                    <p>{field.startContent}</p>
                                )}
                                <label>{field.label}</label>
                                <Select
                                    name={field.name}
                                    options={field.options}
                                    value={field.value}
                                    placeholder={field.placholder}
                                    onChange={(options) => field.handleChange(options)}
                                />
                                <span className={styles.errorHelperText}>{currentStepErrs[field.name]}</span>
                                {field.endContent && (
                                    <p className={styles.endContent}>{field.endContent}</p>
                                )}
                            </div>
                        );
        
                    case 'checkbox':
                        return (
                            <div key={index} className={classNames(styles.inputContainer, field.halfWidth && styles.halfWidth)}>
                                {field.startContent && (
                                    <p>{field.startContent}</p>
                                )}
                                <div className={styles.checkboxWrapper}>
                                    <input
                                        type='checkbox'
                                        value={field.checked}
                                        onChange={(e) =>field.handleChange(e)}
                                        className={styles.checkboxInput}
                                    />
                                    <label>{field.label}</label>
                                    <span className={styles.errorHelperText}>{currentStepErrs[field.name]}</span>
                                </div>
                                {field.endContent && (
                                    <p className={styles.endContent}>{field.endContent}</p>
                                )}
                            </div>
                        );
        
                    case 'radio':
                        return (
                            <div key={index} className={classNames(styles.inputContainer, field.halfWidth && styles.halfWidth)}>
                                {field.startContent && (
                                    <p>{field.startContent}</p>
                                )}
                                <label className={styles.radioLabel}>{field.label}</label>
                                <RadioGroup
                                    name={field.name}
                                    value={field.value}
                                    onChange={(e) => field.handleChange(e)}
                                    row={field.row}
                                >
                                    {field.options.map((option) => (
                                        <FormControlLabel
                                            key={option.value}
                                            value={option.value}
                                            control={<Radio />}
                                            label={option.label}
                                            disabled={option.disabled}
                                        />
                                    ))}
                                </RadioGroup>
                                <span className={styles.errorHelperText}>{currentStepErrs[field.name]}</span>
                                {field.endContent && (
                                    <p className={styles.endContent}>{field.endContent}</p>
                                )}
                            </div>
                        );
                    default:
                        return null;
                }
            })
        }
        return null
    }

    return (
        <div className={styles.formContainer}>
            {title && (
                <h1 className={styles.formTitle}>{title}</h1>
            )}
            {isLoading ? (
                <div className={styles.loaderWrapper}>
                    <span className={styles.loader}></span>
                </div>
            ) : (
                <>
                    {stepsMapping[currentStep].fields?.length && (
                        <p className={styles.formSubtitle}>* All form fields are required</p>
                    )}
                    {stepsMapping[currentStep]?.title && (
                        <h5 className={styles.formSubtitle}>{stepsMapping[currentStep]?.title}</h5>
                    )}
                    {stepsMapping[currentStep].children}
                    <div className={styles.formWrapper}>
                        {renderFields(stepsMapping[currentStep].fields)}
                    </div>
                    <div className={styles.buttonWrapper}>
                        {stepsMapping[currentStep].handleClickPrev && (
                            <button className={styles.actionButton} onClick={() => stepsMapping[currentStep].handleClickPrev()} disabled={currentStep === 0}>
                                Previous
                            </button>
                        )}
                        {stepsMapping[currentStep].handleClickNext && (
                            <button
                                className={classNames(styles.actionButton, styles.buttonEnd)}
                                onClick={() => {
                                    if (checkStepErrors()) {
                                        stepsMapping[currentStep].handleClickNext()
                                    }
                                }}
                            >
                                Next
                            </button>
                        )}
                        {stepsMapping[currentStep].canSubmit && (
                            <button
                                className={classNames(styles.actionButton, styles.buttonEnd)}
                                onClick={() => checkStepErrors() && handleSubmit && handleSubmit()}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default CustomizableForm