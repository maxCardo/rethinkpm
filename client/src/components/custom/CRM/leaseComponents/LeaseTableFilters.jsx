import { useState, useEffect } from "react";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";

const LeaseTableFilters = ({ filterListByQuery, settings }) => {
  const [selectedField, setSelectedField] = useState({});
  const [fieldValOptions, setFieldValOptions] = useState({});
  const [filters, setFilters] = useState({ search: "", field: "", value: "" });

  const FIELDS = [
    {
      label: "Status",
      value: "status",
      valOptions: [
        {
          label: capitalizeFirstLetter(settings.statusOptions.new),
          value: settings.statusOptions.new,
        },
        {
          label: capitalizeFirstLetter(settings.statusOptions.lost),
          value: settings.statusOptions.lost,
        },
      ],
    },
    {
      label: "Temperatures",
      value: "leadTemperature",
      valOptions: [
        {
          label: capitalizeFirstLetter(settings.temperatureOptions.hot),
          value: settings.temperatureOptions.hot,
        },
        {
          label: capitalizeFirstLetter(settings.temperatureOptions.warm),
          value: settings.temperatureOptions.warm,
        },
        {
          label: capitalizeFirstLetter(settings.temperatureOptions.cold),
          value: settings.temperatureOptions.cold,
        },
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

  useEffect(() => {
    filterListByQuery(filters);
  }, [filters, filterListByQuery]);

  const handleFieldValChange = (fieldVal) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      field: selectedField.value,
      value: fieldVal.value,
    }));
  };

  const handleInputChange = (expression) => {
    // Sanitize the input expression
    const sanitizedExpression = expression
      .trim() // Remove leading/trailing whitespace
      .replace(/[<>]/g, "") // Remove potential HTML tags
      .replace(/['"]/g, "") // Remove quotes that could break queries
      .substring(0, 100); // Limit length to prevent overly long searches

    setFilters((prevFilters) => ({
      ...prevFilters,
      search: sanitizedExpression,
    }));
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

export default LeaseTableFilters;
