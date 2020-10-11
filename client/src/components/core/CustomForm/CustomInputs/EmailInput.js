import {Form} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "./PhoneInput";

const EmailInput = ({item, errors, register, defaultValue}) => {
console.log(defaultValue);
  return (
    <Form.Group key={item.name} >
      <Form.Label>{item.label}</Form.Label>
      <input className='form-control' type={item.variation} placeholder={item.name} name={item.name} defaultValue={defaultValue && defaultValue}
             ref={register(item.refObject ? item.refObject : {required: true})} autoComplete="none"/>
      <Form.Text className="text-muted">
        {errors && (errors.type === 'required') ? 'Please enter email' : (errors && errors.type === 'pattern') && 'Please eneter a valid email'}
      </Form.Text>
    </Form.Group>
  )
}

EmailInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

export default EmailInput
