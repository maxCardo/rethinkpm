import React from 'react';
import {Container} from 'react-bootstrap';
import CustomForm from "./CustomForm/CustomForm";
import {emailRegex, phoneRegex, ratingOptions, urlRegex} from "../../util/commonFunctions";

const GoogleFormDemo = () => {


  let INPUTS = [
    {
      label: 'Email Address',
      variation: 'email',
      name: 'emailAddress',
      refObject: {required: true, pattern: emailRegex()}
    },
    {
      label: 'MLS Number',
      name: 'MLSNum',
      refObject: {required: true, length: 7}
    },
    {
      variation: 'radio',
      label: 'Location Conditions',
      name: 'locationConditions',
      options: ratingOptions()
    },
    {
      variation: 'select',
      label: 'Geo Conditions',
      name: 'geoConditions',
      options: ratingOptions()
    },
    {
      variation: 'subtitle',
      name: 'Property',
      description: 'optional description if needed'
    },
    {
      variation: 'select',
      label: 'Occupied?',
      name: 'isOccupied',
      options: [
        {
          value: true,
          label: 'Yes',
        },
        {
          value: false,
          label: 'No',
        },
      ]
    },
    {
      variation: 'subtitle',
      name: 'INSERT PARKING GRID HERE',
    },
    {
      variation: 'radio',
      label: 'Exterior Conditions',
      name: 'exteriorConditions',
      options: ratingOptions()
    },
    {
      variation: 'subtitle',
      name: 'Exterior Items Condition',
    },
    {
      variation: 'radio',
      label: 'Roof Conditions',
      name: 'roofConditions',
      options: ratingOptions()
    },
    {
      variation: 'react-select',
      label: 'React select',
      name: 'reactselect',
      options: [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"}
      ],
      value: {value: "vanilla", label: "Vanilla"}
    },
    {
      variation: 'multi-select',
      label: 'Select Multi',
      name: 'multiselect',
      options: [
        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"}
      ],
      value: []
    },
    {
      variation: 'checkbox',
      label: 'Preference',
      name: 'preference',
    },
    {
      variation: 'multi-select',
      label: 'Phone Numbers',
      name: 'phoneNumbers',
      options: [
        {value: "555555555", label: "5555555555"},
        {value: "6666666", label: "666666"},
        {value: "7777777", label: "7777777"}
      ],
      /*TODO: DELETE VALUE FIELD TO FILL FROM DB*/
      value: [{value: "555555555", label: "5555555555"}],
      mapper: (data) => {
        return data.map((item) => {
          return {
            label: item.number,
            value: item.number
          }
        })
      }
    },
    {
      variation: 'url',
      label: 'Link',
      name: 'link',
      refObject: {required: true, pattern: urlRegex()}
    },
    {
      variation: 'range',
      label: 'Price range',
      name: 'priceRange',
      refObject: {required: true, max: 5000000, min: 20000}
    },
    {
      variation: 'file',
      label: 'Property Image',
      name: 'fileUploaded',
    },
    {
      variation: 'radio',
      label: 'Select One',
      name: 'radioSelected',
      options: [
        {
          label: 'Radio Option 1',
          value: 'option1'
        },
        {
          label: 'Radio Option 2',
          value: 'option2'
        },
        {
          label: 'Radio Option 3',
          value: 'option3'
        }
      ]
    },
  ]

  const mapData = (mapper, data) => mapper(data);

  return (
    <div className="container formContainer">
      <div className="formBox">
        <h2 className="form-title">Property Listing Assessment</h2>
        <p>Probably another description and not that google disclaimer thing.</p>
      </div>

        <CustomForm inputs={INPUTS}/>

    </div>

  );
}


export default GoogleFormDemo
