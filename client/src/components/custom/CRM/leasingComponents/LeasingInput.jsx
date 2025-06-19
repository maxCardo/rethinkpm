// import { useState } from "react";
import {
  Checkbox,
  TextField,
  TextareaAutosize,
  FormControlLabel,
} from "@mui/material";
import Select from "react-select";

const LeasingInput = ({
  inputComponent,
  placeholder,
  size = "small",
  className,
  checkboxLabel,
  type = "text",
}) => {
  const INPUT_TYPES = {
    TextField: 1,
    Select: 2,
    Textarea: 3,
    Checkbox: 4,
  };

  return (
    <>
      {inputComponent === INPUT_TYPES.TextField && (
        <TextField
          variant="outlined"
          size={size}
          className={className}
          placeholder={placeholder}
          type={type}
        />
      )}
      {inputComponent === INPUT_TYPES.Select && (
        <Select
          variant="outlined"
          size={size}
          className={className}
          placeholder={placeholder}
        ></Select>
      )}
      {inputComponent === INPUT_TYPES.Textarea && (
        <TextareaAutosize
          className={className}
          placeholder={placeholder}
          minRows={10}
          maxRows={10}
          style={{ border: "1px solid lightgrey" }}
        />
      )}
      {inputComponent === INPUT_TYPES.Checkbox && (
        <FormControlLabel control={<Checkbox />} label={checkboxLabel} />
      )}
    </>
  );
};

export default LeasingInput;
