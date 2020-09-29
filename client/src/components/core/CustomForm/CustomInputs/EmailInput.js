import {Form} from "react-bootstrap";
import React from "react";
import {useForm} from "react-hook-form";

const EmailInput = ({item, errors, register}) => {

  return (
    <Form.Group key={item.name} >
      <Form.Label>{item.label}</Form.Label>
      <input className='form-control' type={item.variation} placeholder={item.name} name={item.name}
             ref={register(item.refObject ? item.refObject : {})}/>
      <Form.Text className="text-muted">
        {errors && (errors.email.type === 'required') ? 'Please enter email' : (errors && errors.email.type === 'pattern') && 'Please eneter a valid email'}
      </Form.Text>
    </Form.Group>
  )
}

export default EmailInput
