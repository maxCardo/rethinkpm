import {Form} from "react-bootstrap";
import React from "react";
import {urlRegex} from "../../../../util/commonFunctions";

const UrlInput = ({item, errors, register}) => {

  return (

    <Form.Group key={item.name}>
      <Form.Label>{item.label}</Form.Label>
      <input type="url" placeholder={item.name} name={item.name}
             ref={register({required: true, pattern:  urlRegex()})} />
      <Form.Text className="text-muted">
        {errors && 'Please Enter valid URL'}
      </Form.Text>
    </Form.Group>
  )
}

export default UrlInput
