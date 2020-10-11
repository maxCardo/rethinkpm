import {Form} from "react-bootstrap";
import React from "react";
import Select from "react-select";
import { useForm, Controller} from "react-hook-form";
import PropTypes from "prop-types";

const ReactSelectInput = ({item}) => {
  const {register, handleSubmit, errors, control} = useForm()

  return (

    <Form.Group key={item.name} >
      <Form.Label>{item.label}</Form.Label>
      <Controller
        register={register}
        defaultValue={item.value}
        name={item.name}
        options={item.options}
        as={Select}
        isClearable
        control={control}
        rules={{required: true}}
      />
    </Form.Group>
  )
}


ReactSelectInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};


export default ReactSelectInput
