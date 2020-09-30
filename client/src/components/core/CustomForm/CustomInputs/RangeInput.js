import {Form} from "react-bootstrap";
import React from "react";

const RangeInput = ({item, errors, register}) => {

  return (

    <Form.Group key={item.name}>
      <Form.Label>{item.label}</Form.Label>
      <input type="range" placeholder={item.name} name={item.name} ref={register(item.refObject)} />
      <Form.Text className="text-muted">
        {errors && 'Please Enter valid values'}
      </Form.Text>
    </Form.Group>
  )
}

export default RangeInput


