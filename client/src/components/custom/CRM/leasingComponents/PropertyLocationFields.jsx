import React from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import { Typography, Divider } from "@mui/material";

const PropertyLocationFields = ({ formData, handleInputChange }) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Property Location
    </Typography>
    <Divider className="mb-4" />
    <div className="flex flex-wrap gap-4 items-center mb-2">
      <TextField
        field={{ name: "Address", accessor: "listingAddress" }}
        withLabel={true}
        col={5}
        onChange={(e) => handleInputChange(e, "listingAddress")}
        value={formData.listingAddress}
      />
      <TextField
        field={{ name: "State", accessor: "state" }}
        withLabel={true}
        col={4}
        onChange={(e) => handleInputChange(e, "state")}
        value={formData.state}
      />
      <TextField
        field={{ name: "Zip Code", accessor: "zipCode" }}
        withLabel={true}
        col={3}
        onChange={(e) => handleInputChange(e, "zipCode")}
        value={formData.zipCode}
      />
    </div>
  </div>
);

export default PropertyLocationFields;
