import {Form} from "react-bootstrap";
import React from "react";
import Select from "react-select";
import {useForm, Controller} from "react-hook-form";

const ReactSelectInput = ({item, control}) => {

  return (

    <Form.Group key={item.name} >
      <Controller
        isMulti={true}
        defaultValue={[{value: 'Select at least one', label: 'OMFG'}]}
        name={item.name}
        as={Select}
        options={item.options}
        control={control}
        rules={{required: true}}
      />
    </Form.Group>
  )
}

export default ReactSelectInput
