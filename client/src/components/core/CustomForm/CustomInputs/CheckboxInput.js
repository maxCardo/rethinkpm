import {Form} from "react-bootstrap";
import React from "react";
import {checkBoxCheck} from "../../../../util/commonFunctions";
import PropTypes from "prop-types";
import MultiSelectInput from "./MultiSelectInput";

const checkBox = checkBoxCheck();

const CheckboxInput = ({item, register}) => {

  return (

    <Form.Group key={item.name}>
      <div className="element-wrapper with--checkbox">
        <label className="checkbox path">
          <input className='form-control' type="checkbox" checked={item.value} name={item.name} ref={register}/>
          {checkBox} &nbsp; {item.label}
        </label>
      </div>
    </Form.Group>
  )
}

// TODO: is this right ?
CheckboxInput.propTypes = {
  item: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

export default CheckboxInput


