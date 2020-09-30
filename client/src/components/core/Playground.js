import React from 'react';
import {useForm} from "react-hook-form";
import {Form, Container} from 'react-bootstrap';
import CustomForm from "./CustomForm/CustomForm";

const Playground = () => {
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);



  let INPUTS = [
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
      refObject: {required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/}
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
      options: [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"}
      ]
    },
    {
      variation: 'multi-select',
      label: 'Select Multi',
      name: 'multiselect',
      options: [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"}
      ]
    },
    {
      variation: 'checkbox',
      label: 'Preference',
      name: 'preference',
    },
  ]

  const editData = {
    email: 'somemail@mail.com',
    name: 'Bozidar Siljanoski',
    phone: '078242826',
    gender: 'shit'
  }

  const editRecord = () => {
    INPUTS.map( (item, idx) => {
      if (item) {
        Object.keys(editData).map(function(key, index) {
          if (item.name === key) {
            INPUTS[idx].data = editData[key];
          }
        });
      }
    });
  }
  //editRecord();

  return (
    <Container>
      <h2 className="form-title">Enter bla bla</h2>
      <CustomForm inputs={INPUTS}/>
    </Container>

  );
}


export default Playground
