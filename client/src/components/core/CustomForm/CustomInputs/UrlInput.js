import {Form} from "react-bootstrap";
import React from "react";
import {urlRegex} from "../../../../util/commonFunctions";
import PropTypes from "prop-types";
import SelectInput from "./SelectInput";

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

SelectInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default UrlInput
