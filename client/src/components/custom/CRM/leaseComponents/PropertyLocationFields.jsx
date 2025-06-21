import React, { useEffect } from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import { Typography, Divider } from "@mui/material";

const PropertyLocationFields = ({ formData, handleInputChange }) => {
  // Helper to split listingAddress into address, state, zipCode
  const [address, state, zipCode] = (formData.listingAddress || "  ")
    .split(",")
    .map((s) => s.trim());

  // When any field changes, join and update listingAddress in parent
  const handleFieldChange = (field, value) => {
    let newAddress = address,
      newState = state,
      newZip = zipCode;
    if (field === "address") newAddress = value;
    if (field === "state") newState = value;
    if (field === "zipCode") newZip = value;
    const joined = [newAddress, newState, newZip].filter(Boolean).join(", ");
    handleInputChange(null, "listingAddress", joined);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Property Location
      </Typography>
      <Divider className="mb-4" />
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <TextField
          field={{ name: "Address", accessor: "address" }}
          withLabel={false}
          col={5}
          onChange={(e) => handleFieldChange("address", e.target.value)}
          value={address || ""}
        />
        <TextField
          field={{ name: "State", accessor: "state" }}
          withLabel={false}
          col={4}
          onChange={(e) => handleFieldChange("state", e.target.value)}
          value={state || ""}
        />
        <TextField
          field={{ name: "Zip Code", accessor: "zipCode" }}
          withLabel={false}
          col={3}
          onChange={(e) => handleFieldChange("zipCode", e.target.value)}
          value={zipCode || ""}
        />
      </div>
    </div>
  );
};

export default PropertyLocationFields;
