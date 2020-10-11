import React from 'react';
import {useForm, Controller} from "react-hook-form";
import {Form, Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './style.css'
import EmailInput from "./CustomInputs/EmailInput";
import PhoneInput from "./CustomInputs/PhoneInput";
import SelectInput from "./CustomInputs/SelectInput";
import CheckboxInput from "./CustomInputs/CheckboxInput";
import UrlInput from "./CustomInputs/UrlInput";
import Select from "react-select";
import FileInput from "./CustomInputs/FileInput";
import RadioInput from "./CustomInputs/RadioInput";

const CustomForm = ({inputs}) => {

  const {register, handleSubmit, errors, control} = useForm()
  // console.log(errors);

  const onSubmit = data => console.log(data)


  return (
    <Container className='CustomForm__container'>
      <Form onSubmit={handleSubmit(onSubmit)} className="CustomForm">
        {inputs && inputs.map((item, index) => {
          switch (item.variation) {
            case 'email':
              return (
                <EmailInput item={item}
                            errors={errors && errors.email}
                            register={register}
                            key={item.name}
                            defaultValue={item.data && item.data}
                />
              );
            case 'phone':
              return (
                <PhoneInput item={item}
                            errors={errors && errors.phone}
                            register={register}
                            key={item.name}
                            defaultValue={item.data && item.data}
                />
              )
            case 'select':
              return (
                <SelectInput item={item} errors={errors && errors['name']} register={register} key={item.name}/>
              )
            case 'react-select':
              return (
                <Form.Group key={item.name}>
                  <Form.Label>{item.label}</Form.Label>
                  <Controller

                    register={register}
                    defaultValue={{label: 'Please select...', value: 'nothing selected'}}
                    name={item.name}
                    options={item.options}
                    as={Select}
                    isClearable
                    control={control}
                    rules={{required: true}}
                  />
                </Form.Group>
              )
            case 'multi-select':
              return (
                <Form.Group key={item.name}>
                  <Form.Label>{item.label}</Form.Label>
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
            case 'checkbox':
              return (
                <CheckboxInput item={item} errors={errors && errors['name']} register={register} key={item.name}/>
              )
            case 'url':
              return (
                <UrlInput item={item} errors={errors && errors['name']} register={register} key={item.name}/>
              )
            case 'file':
              return (
                <FileInput  item={item} errors={errors && errors['name']} register={register} key={item.name} />
              )
            case 'radio':
              return <RadioInput  item={item} errors={errors && errors['name']} register={register} key={item.name} />
            default:
              return (
                <Form.Group key={`customForm-${index}`}>
                  <Form.Label>{item.label}</Form.Label>
                  <Form.Control type={item.variation} placeholder={item.name} name={item.name}
                                defaultValue={item.data && item.data}
                                ref={register(item.refObject ? item.refObject : {})}/>
                </Form.Group>
              );
          }
        })}
        <div className='CustomForm__button-container'>
          <input className='btn btn-primary ml-auto' type="submit"/>
        </div>
      </Form>
    </Container>

  );
}

CustomForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  initialState: PropTypes.object
};


export default CustomForm
