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
    /*TODO: create a multiple file input?*/
    {
      variation: 'file',
      label: 'Roof Pics',
      name: 'roofPictures',
    },
    {
      variation: 'radio',
      label: 'Sidewalk Condition',
      name: 'sidewalkConditions',
      options: ratingOptions()
    },
    {
      label: 'Number of Windows',
      name: 'sidewalkConditions',
      options: ratingOptions()
    },
    {
      variation: 'radio',
      label: 'Window Condition',
      name: 'windowConditions',
      options: ratingOptions()
    },
    {
      variation: 'radio',
      label: 'Exterior Facade Type',
      name: 'exteriorFacadeType',
      options: [
        {value: 'brick', label: 'Brick'},
        {value: 'siding', label: 'Siding'},
        {value: 'brickSiding', label: 'Brick/Siding'},
        {value: 'other', label: 'Other'},
      ]
    },
  ];

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
