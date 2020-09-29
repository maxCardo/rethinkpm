import React from 'react';
import {useForm, Controller} from "react-hook-form";
import {Form, Container} from 'react-bootstrap';
import PropTypes from 'prop-types';
import './style.css'
import {checkBoxCheck} from "../../../util/commonFunctions";
import Select from "react-select";
import EmailInput from "./CustomInputs/EmailInput";

const CustomForm = ({inputs}) => {

  const {register, handleSubmit, errors, control} = useForm()
  console.log(errors);
  const onSubmit = data => console.log(data)

  const checkBox = checkBoxCheck();

  return (
    <Container className='CustomForm__container'>
      <Form onSubmit={handleSubmit(onSubmit)} className="CustomForm">
        {inputs && inputs.map((item, index) => {
          if (item.variation === 'email') {
            return (
              <EmailInput item={item} errors={errors && errors.email} register={register} key={item.name}/>
            );
          } else if (item.variation === 'phone') {
            return (
              <Form.Group key={item.name}>
                <Form.Label>{item.label}</Form.Label>
                <input className='form-control' type='tel' placeholder={item.name} name={item.name}
                       ref={register(item.refObject ? item.refObject : {})}/>
                <Form.Text className="text-muted">
                  {errors.phone && errors.phone.type === 'required' ? 'Please enter phone' : (errors.phone && errors.phone.type === 'pattern') && 'Please eneter a valid email'}
                </Form.Text>
              </Form.Group>
            )
          } else if (item.variation === 'select') {
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

              </Form.Group>
            )
          } else if (item.variation === 'react-select') {
            return (
              <Form.Group>
                <Controller
                  name="iceCreamType"
                  as={Select}
                  options={[
                    {value: "chocolate", label: "Chocolate"},
                    {value: "strawberry", label: "Strawberry"},
                    {value: "vanilla", label: "Vanilla"}
                  ]}
                  control={control}
                  rules={{required: true}}
                />
              </Form.Group>
            )
          } else if (item.variation === 'checkbox') {
            return (
              <Form.Group key={item.name}>
                <div className="element-wrapper with--checkbox">
                  <label className="checkbox path">
                    <input className='form-control' type="checkbox" name={item.name} ref={register}/>
                    {checkBox} &nbsp; {item.label}
                  </label>
                </div>
              </Form.Group>
            )
          } else {
            return (
              <Form.Group key={`customForm-${index}`}>
                <Form.Label>{item.label}</Form.Label>
                <Form.Control type={item.variation} placeholder={item.name} name={item.name}
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
  inputs: PropTypes.array.isRequired
};


export default CustomForm
