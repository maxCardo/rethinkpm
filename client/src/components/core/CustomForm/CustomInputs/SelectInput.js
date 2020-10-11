import {Form} from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import PhoneInput from "./PhoneInput";

const SelectInput = ({item, errors, register}) => {

  return (

    <Form.Group key={item.name}>
      <Form.Label>{item.label}</Form.Label>
      <Form.Control as="select" name={item.name} ref={register(item.refObject ? item.refObject : {})}>
        <option value="">Please select</option>
        {item.options && item.options.map(value => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </Form.Control>
      <Form.Text className="text-muted">
        {errors && 'Please Select an option'}
      </Form.Text>
    </Form.Group>
  )
}

SelectInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object
};

export default SelectInput
