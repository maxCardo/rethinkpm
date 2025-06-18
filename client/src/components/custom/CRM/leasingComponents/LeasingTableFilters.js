import { useState, useEffect } from "react";
import Select from "react-select";

const LeasingTableFilter = ({ updateTableList }) => {
  const [selectedField, setSelectedField] = useState({});
  const [fieldValOptions, setFieldValOptions] = useState({});

  const handleFieldChange = (field) => {
    console.log("Selcted field:", field);
    setSelectedField(field);
  };

  useEffect(() => {
    if (selectedField.value === "status") {
      setFieldValOptions([
        { label: "New", value: "new" },
        { label: "Lost", value: "lost" },
      ]);
    } else if (selectedField.value === "leadTemperature") {
      setFieldValOptions([
        { label: "Hot", value: "hot" },
        { label: "Warm", value: "warm" },
        { label: "Cold", value: "cold" },
      ]);
    }
  }, [selectedField]);

  const handleFieldValChange = (fieldVal) => {
    updateTableList(selectedField.value, fieldVal.label);
  };

  return (
    <>
      <div className="leads-table-filters flex flex-row my-4 ">
        <Select
          className="marketplace__filter-select"
          onChange={handleFieldChange}
          defaultValue="All"
          options={[
            { label: "Status", value: "status" },
            { label: "Temperatures", value: "leadTemperature" },
          ]}
          placeholder="Select Filter"
          // value={selectedFilter}
        />
        {fieldValOptions.length > 0 && (
          <Select
            className="marketplace__filter-select"
            onChange={handleFieldValChange}
            defaultValue="All"
            options={fieldValOptions}
            placeholder="Select Filter"
            // value={selectedFilter}
          />
        )}
      </div>
    </>
  );
};

export default LeasingTableFilter;
