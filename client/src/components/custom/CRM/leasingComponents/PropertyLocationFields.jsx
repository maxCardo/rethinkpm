import React, { useEffect, useState } from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import { Typography, Divider } from "@mui/material";

const PropertyLocationFields = ({ formData, handleInputChange }) => {
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const addressString = [address, state, zipCode].filter(Boolean).join(", ");
    if (formData.listingAddress !== addressString) {
      handleInputChange(null, "listingAddress", addressString);
    }
  }, [address, state, zipCode, handleInputChange, formData.listingAddress]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Property Location
      </Typography>
      <Divider className="mb-4" />
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <TextField
          field={{ name: "Address", accessor: "listingAddress" }}
          withLabel={false}
          col={5}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <TextField
          field={{ name: "State", accessor: "state" }}
          withLabel={false}
          col={4}
          onChange={(e) => setState(e.target.value)}
          value={state}
        />
        <TextField
          field={{ name: "Zip Code", accessor: "zipCode" }}
          withLabel={false}
          col={3}
          onChange={(e) => setZipCode(e.target.value)}
          value={zipCode}
        />
      </div>
    </div>
  );
};

export default PropertyLocationFields;
