import { useState, useEffect } from "react";
import Select from "react-select";

const LeasingTableFilter = ({ updateTableList }) => {
  const [selectedField, setSelectedField] = useState({});
  const [fieldValOptions, setFieldValOptions] = useState({});

  const FIELDS = [
    {
      label: "Status",
      value: "status",
      valOptions: [
        { label: "New", value: "new" },
        { label: "Lost", value: "lost" },
      ],
    },
    {
      label: "Temperatures",
      value: "leadTemperature",
      valOptions: [
        { label: "Hot", value: "hot" },
        { label: "Warm", value: "warm" },
        { label: "Cold", value: "cold" },
      ],
    },
    { label: "Owner", value: "leadOwner", valOptions: [] },
    { label: "Next Follow-Up", value: "followUpDate", valOptions: [] },
    { label: "Tour Date", value: "tourDate", valOptions: [] },
  ];

  const handleFieldChange = (field) => {
    setSelectedField(field);
  };

  useEffect(() => {
    setFieldValOptions(selectedField.valOptions);
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
          options={FIELDS}
          placeholder="Select Filter"
        />
        {fieldValOptions?.length > 0 && (
          <Select
            className="marketplace__filter-select"
            onChange={handleFieldValChange}
            defaultValue="All"
            options={fieldValOptions}
            placeholder="Select Filter"
          />
        )}
      </div>
    </>
  );
};

export default LeasingTableFilter;
