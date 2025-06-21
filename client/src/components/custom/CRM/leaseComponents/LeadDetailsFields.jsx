import React, { useState } from "react";
import TextField from "../../profile/addLead/InputFields/TextField";
import Select from "react-select";
import { Typography, Divider, TextareaAutosize } from "@mui/material";

const LeadDetailsFields = ({
  formData,
  handleInputChange,
  handleNotesFieldChange,
  settings,
  errors,
  noteField,
}) => {
  const [status, setStatus] = useState(formData.status || "new");

  const handleStatusChange = (selected) => {
    setStatus(selected.value);
    handleInputChange(null, "status", selected.value);
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Lead Details
      </Typography>
      <Divider className="mb-4" />
      <div className="flex flex-wrap gap-4 mb-4">
        <Select
          className="marketplace__filter-select min-w-[180px]"
          options={[
            { label: "", value: "" },
            { label: "Hot", value: settings.temperatureOptions.hot },
            { label: "Warm", value: settings.temperatureOptions.warm },
            { label: "Cold", value: settings.temperatureOptions.cold },
          ]}
          placeholder="Lead Temperature"
          onChange={(selected) =>
            handleInputChange(
              null,
              "leadTemperature",
              selected ? selected.value : ""
            )
          }
          value={
            formData.leadTemperature
              ? {
                  label:
                    formData.leadTemperature.charAt(0).toUpperCase() +
                    formData.leadTemperature.slice(1),
                  value: formData.leadTemperature,
                }
              : null
          }
        />
        <TextField
          field={{ name: "Lead Source", accessor: "leadSource" }}
          withLabel={false}
          col={5}
          onChange={(e) => handleInputChange(e, "leadSource")}
          value={formData.leadSource}
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
        <Select
          className="marketplace__filter-select min-w-[120px]"
          placeholder="Status"
          options={[
            { label: "New", value: "new" },
            { label: "Lost", value: "lost" },
          ]}
          value={{
            label: status.charAt(0).toUpperCase() + status.slice(1),
            value: status,
          }}
          onChange={handleStatusChange}
        />
        {status === "lost" && (
          <TextField
            field={{ name: "Reason for Loss", accessor: "reasonForLoss" }}
            withLabel={true}
            col={5}
            onChange={(e) => handleInputChange(e, "reasonForLoss")}
            value={formData.reasonForLoss}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <TextField
          field={{ name: "Last Contact", accessor: "lastContact" }}
          withLabel={true}
          col={5}
          type="date"
          onChange={(e) => handleInputChange(e, "lastContact")}
          value={formData.lastContact ? formData.lastContact.slice(0, 10) : ""}
        />
        <TextField
          field={{ name: "Next Action", accessor: "nextAction" }}
          withLabel={true}
          col={5}
          type="date"
          onChange={(e) => handleInputChange(e, "nextAction")}
          value={formData.nextAction ? formData.nextAction.slice(0, 10) : ""}
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
          value={
            Array.isArray(formData.notes) && formData.notes[0]?.content
              ? formData.notes[0].content
              : ""
          }
        />
      </div>
    </div>
  );
};

export default LeadDetailsFields;
