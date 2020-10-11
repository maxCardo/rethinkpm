import React, {Fragment} from "react";

const RadioInput = ({register, item}) => {

  return (
    <div className="radio-container">
      <label htmlFor={item.value}>{item.label}</label>
      {item.options.map((option, index) => {
        return (
          <label htmlFor={option.value}>
            {option.label}
            <input key={index} id={option.value} name={item.name} value={option.value} type="radio" ref={register}/>
          </label>
        );
      })}
    </div>
  )
}

export default RadioInput



