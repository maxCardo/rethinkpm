import { Form } from "react-bootstrap";
import React from "react";
import Select from "react-select";
import { useForm, Controller} from "react-hook-form";
import PropTypes from "prop-types";
import SelectInput from "./SelectInput";

const MultiSelectInput = ({item}) => {
  const {register, handleSubmit, errors, control} = useForm()

  return (
    <Form.Group key={item.name} >
      <Controller
        register={register}
        isMulti={true}
        defaultValue={item.value ? item.value : item.selected}
        name={item.name}
        as={Select}
        options={item.options}
        control={control}
        rules={{required: true}}
      />
    </Form.Group>
  )
}
// TODO: is this right ? 
MultiSelectInput.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MultiSelectInput
