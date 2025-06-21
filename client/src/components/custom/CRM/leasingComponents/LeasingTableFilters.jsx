import { useState, useEffect } from "react";
import Select from "react-select";

const LeasingTableFilter = ({
  filterListByField,
  filterListBySearch,
  settings,
}) => {
  const [selectedField, setSelectedField] = useState({});
  const [fieldValOptions, setFieldValOptions] = useState({});

  const FIELDS = [
    {
      label: "Status",
      value: "status",
      valOptions: [
        { label: "New", value: settings.statusOptions.new },
        { label: "Lost", value: settings.statusOptions.lost },
      ],
    },
    {
      label: "Temperatures",
      value: "leadTemperature",
      valOptions: [
        { label: "Hot", value: settings.temperatureOptions.hot },
        { label: "Warm", value: settings.temperatureOptions.warm },
        { label: "Cold", value: settings.temperatureOptions.cold },
      ],
    },
    { label: "Owner", value: "leadOwner", valOptions: [] },
    { label: "Next Follow-Up", value: "nextAction", valOptions: [] },
    { label: "Tour Date", value: "tourDate", valOptions: [] },
  ];

  const handleFieldChange = (field) => {
    setSelectedField(field);
  };

  useEffect(() => {
    setFieldValOptions(selectedField.valOptions);
  }, [selectedField]);

  const handleFieldValChange = (fieldVal) => {
    filterListByField(selectedField.value, fieldVal.value);
  };

  const handleInputChange = (expression) => {
    filterListBySearch(expression);
  };

  return (
    <>
      <div className="leads-table-filters flex flex-row">
        <input
          className="form-control searchInput"
          tabIndex={0}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search"
        />
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
