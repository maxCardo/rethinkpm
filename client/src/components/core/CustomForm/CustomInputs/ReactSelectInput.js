import {Form} from "react-bootstrap";
import React, {useState} from "react";
import Select from "react-select";
import { useForm, Controller} from "react-hook-form";

const ReactSelectInput = ({item}) => {
  const {control} = useForm()

  console.log(item.options);

  return (

    <Form.Group key={item.name} >
      <Form.Label>{item.label}</Form.Label>
      <Controller
        name={item.name}
        options={item.options}
        as={Select}
        control={control}
        rules={{required: true}}
      />
    </Form.Group>
  )
}

export default ReactSelectInput
