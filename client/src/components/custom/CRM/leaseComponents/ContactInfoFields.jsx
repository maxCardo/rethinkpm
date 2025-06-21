import React from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import { Button, Typography, Divider } from "@mui/material";
import { FaPlus } from "react-icons/fa";

const ContactInfoFields = ({
  formData,
  errors,
  phoneFields,
  handleInputChange,
  handlePhoneChange,
  addPhoneField,
}) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Contact Information
    </Typography>
    <Divider className="mb-4" />
    <div className="flex flex-wrap gap-4 mb-4">
      <TextField
        field={{ name: "First Name", accessor: "firstName" }}
        withLabel={false}
        col={5}
        onChange={(e) => handleInputChange(e, "firstName")}
        style={{ minWidth: 180 }}
        value={formData.firstName}
      />
      <TextField
        field={{ name: "Last Name", accessor: "lastName" }}
        withLabel={false}
        col={5}
        onChange={(e) => handleInputChange(e, "lastName")}
        style={{ minWidth: 180 }}
        value={formData.lastName}
      />
      <TextField
        field={{ name: "Email", accessor: "email.address" }}
        withLabel={false}
        col={5}
        type="email"
        onChange={(e) => handleInputChange(e, "email.address")}
        error={!!errors.email}
        helperText={errors.email}
        value={formData.email[0]?.address || ""}
      />
    </div>
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1">Phone Numbers</Typography>
      {phoneFields.map((item, index) => (
        <div className="flex items-center gap-3 mb-2" key={index}>
          <TextField
            field={{ name: "Phone", accessor: `phoneNumbers[${index}].number` }}
            withLabel={false}
            col={4}
            type="tel"
            value={item.number}
            onChange={(e) => handlePhoneChange(index, "number", e.target.value)}
            error={!!errors.phone && index === 0}
            helperText={errors.phone && index === 0 ? errors.phone : ""}
          />
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={item.isPrimary}
              onChange={(e) =>
                handlePhoneChange(index, "isPrimary", e.target.checked)
              }
            />{" "}
            Primary
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={item.okToText}
              onChange={(e) =>
                handlePhoneChange(index, "okToText", e.target.checked)
              }
            />{" "}
            Ok to text
          </label>
          {index === 0 && (
            <Button
              variant="contained"
              size="small"
              startIcon={<FaPlus size={"0.8rem"} />}
              style={{ textTransform: "none" }}
              onClick={addPhoneField}
            >
              Add Number
            </Button>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default ContactInfoFields;
