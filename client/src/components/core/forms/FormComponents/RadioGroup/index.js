import React from 'react'
import styles from './radiogroup.module.css'
import cx from 'classnames'

const RadioGroup = ({
  name,
  options,
  selected,
  className,
  fullWidth,
  onChange,
}) => {
  const handleOptionChange = (event) => {
    if (onChange) onChange(event)
  }
  return (
    <div className={cx(styles.root, fullWidth && styles.fullWidth)}>
      {options.map((option) => {
        return (
          <label
            key={option.value}
            className={cx(
              styles.radioButton,
              styles[option.value],
              fullWidth && styles.fullWidthLabel,
              (selected === option.value) && styles.isActive,
              option.disabled && styles.disabled,
              className
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={handleOptionChange}
              disabled={option.disabled}
            />
            {option.label}
          </label>
        )
      })}
    </div>
  )
}

export default RadioGroup
