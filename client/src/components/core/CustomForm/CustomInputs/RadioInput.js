import React from "react";
import PropTypes from "prop-types";

const RadioInput = ({register, item}) => {

  return (
    <div className="form-group radio-container">
      <label htmlFor={item.value}>{item.label}</label>
      {item.options.map((option, index) => {
        return (
          <label htmlFor={item.name+option.value}>
            <input key={index} id={item.name+option.value} name={item.name+item.name} value={option.value} type="radio" ref={register}/>
            {option.label}
          </label>
        );
      })}
    </div>
  )
}

RadioInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

export default RadioInput
