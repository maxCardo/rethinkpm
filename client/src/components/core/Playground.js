import React from 'react';
import { useForm } from "react-hook-form";
import { Form, Container } from 'react-bootstrap';
import CustomForm from "./CustomForm/CustomForm";

const Playground = () => {
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);

  const INPUTS = [
    {
      label: 'Email Address',
      variation: 'email',
      name: 'email',
      refObject: {required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/}
    },
    {
      label: 'Name',
      name: 'name',
    },
    {
      variation: 'phone',
      label: 'Phone',
      name: 'phone',
      refObject: {required: true}
    },
    {
      refObject: {required: true},
      variation: 'select',
      label: 'Geneder',
      name: 'gender',
      options: [
        {
        value: 'male',
        label: 'Male',
       },
        {
          value: 'female',
          label: 'Female',
        },
        {
          value: 'dodge',
          label: 'Dodge',
        },
       ]
    },
    {
      variation: 'react-select',
      label: 'Reactive selections',
      name: 'reactselect',
    },
    {
      variation: 'checkbox',
      label: 'Preference',
      name: 'preference',
    },
  ]

  return (
    <Container>

     <CustomForm inputs={INPUTS} />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <input type="email" placeholder="Email" name="Email"
                        ref={register({required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/})}/>
          <Form.Text className="text-muted">
            {errors.email && errors.email}
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control  type="text" placeholder="First name" name="First name" ref={register({required: true, maxLength: 80})}  />
        </Form.Group>


        <input/>
        <input type="text" placeholder="Last name" name="Last name" ref={register({required: true, maxLength: 100})}/>
        <input type="tel" placeholder="Mobile number" name="Mobile number"
               ref={register({required: true, minLength: 6, maxLength: 12})}/>
        {/* TODO: Try to make bellow element with react-select in Form.js, or just leave react-select as UI element and change the actual inputs to react-bootstrap? */}
        <select name="Title" ref={register({required: true})}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>

        <input name="Developer" type="radio" value="Yes" ref={register({required: true})}/>
        <input name="Developer" type="radio" value="No" ref={register({required: true})}/>
        <input type="week" placeholder="week" name="week" ref={register}/>
        <input type="range" placeholder="range" name="range" ref={register}/>
        <input type="time" placeholder="time" name="time" ref={register}/>

        <input type="submit"/>
      </Form>
    </Container>

  );
}


export default Playground
