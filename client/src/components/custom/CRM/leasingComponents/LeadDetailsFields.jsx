import React from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import Select from "react-select";
import { Typography, Divider, TextareaAutosize } from "@mui/material";

const LeadDetailsFields = ({
  formData,
  handleInputChange,
  handleNotesFieldChange,
  errors,
  noteField,
}) => (
  <div>
    <Typography variant="h6" gutterBottom>
      Lead Details
    </Typography>
    <Divider className="mb-4" />
    <div className="flex flex-wrap gap-4 mb-4">
      <Select
        className="marketplace__filter-select min-w-[180px]"
        defaultValue="All"
        options={[
          { label: "Hot", value: "hot" },
          { label: "Warm", value: "warm" },
          { label: "Cold", value: "cold" },
        ]}
        placeholder="Lead Temperature"
        onChange={(selected) =>
          handleInputChange(null, "leadTemperature", selected.value)
        }
        value={
          formData.leadTemperature
            ? {
                label: formData.leadTemperature,
                value: formData.leadTemperature,
              }
            : null
        }
      />
      <Select
        className="marketplace__filter-select min-w-[180px]"
        defaultValue="All"
        placeholder="Lead Source"
        onChange={(selected) =>
          handleInputChange(null, "leadSource", selected.value)
        }
        value={
          formData.leadSource
            ? { label: formData.leadSource, value: formData.leadSource }
            : null
        }
      />
      <Select
        className="marketplace__filter-select min-w-[180px]"
        defaultValue="All"
        placeholder="Lead Owner"
        onChange={(selected) =>
          handleInputChange(null, "leadOwner", selected.value)
        }
        value={
          formData.leadOwner
            ? { label: formData.leadOwner, value: formData.leadOwner }
            : null
        }
      />
    </div>
    <div className="flex flex-wrap gap-4 mb-4">
      <TextField
        field={{ name: "Last Contact", accessor: "lastContact" }}
        withLabel={true}
        col={5}
        type="date"
        onChange={(e) => handleInputChange(e, "lastContact")}
        value={formData.lastContact}
      />
      <TextField
        field={{ name: "Next Action", accessor: "nextAction" }}
        withLabel={true}
        col={5}
        type="date"
        onChange={(e) => handleInputChange(e, "nextAction")}
        value={formData.nextAction}
      />
    </div>
    <div className="mb-2">
      <Typography variant="subtitle1">Notes</Typography>
      <TextareaAutosize
        placeholder={"Write your notes here..."}
        className="w-full rounded border border-gray-300 p-2 mt-1 focus:border-blue-400 focus:outline-none"
        minRows={5}
        maxRows={5}
        onChange={handleNotesFieldChange}
        value={noteField[0]?.content || ""}
      />
    </div>
  </div>
);

export default LeadDetailsFields;
