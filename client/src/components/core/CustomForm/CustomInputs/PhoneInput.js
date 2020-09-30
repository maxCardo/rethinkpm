import {Form} from "react-bootstrap";
import React, {useState} from "react";

const PhoneInput = ({item, errors, register, defaultValue}) => {
  const [valid, setValid] = useState(false);

  const validate = (e) => {
    const validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    e && setValid(!!e.target.value.match(validPhone))
  };

  const onChangeNumber =(e) => {

    return validate(e);

  };

  return (
    <Form.Group key={item.name}>
      <Form.Label>{item.label}</Form.Label>
      <input className={`form-control ${valid ? 'valid' : 'invalid'}`}
             type='tel'
             placeholder={item.name}
             name={item.name}
             defaultValue={defaultValue && defaultValue}
             ref={register(item.refObject ? item.refObject : {})} onChange={(e) => onChangeNumber(e)}/>
      <Form.Text className="text-muted">
        {errors && 'Please enter a valid phone number'}
      </Form.Text>
    </Form.Group>
  )
}

export default PhoneInput
