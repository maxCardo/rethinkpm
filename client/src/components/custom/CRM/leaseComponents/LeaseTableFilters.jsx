import { useState, useEffect } from "react";
import Select from "react-select";
import { capitalizeFirstLetter } from "../../../../util/commonFunctions";

const LeaseTableFilters = ({ filterListByQuery, settings }) => {
  const [selectedField, setSelectedField] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [fieldValOptions, setFieldValOptions] = useState({});
  const [filters, setFilters] = useState({ search: "", field: "", value: "" });

  const FIELDS = [
    {
      label: "All",
      value: settings.filterFields.all,
    },
    {
      label: "Status",
      value: settings.filterFields.status,
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
      value: settings.filterFields.leadTemperature,
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
    { label: "Owner", value: settings.filterFields.leadOwner, valOptions: [] },
    {
      label: "Next Action",
      value: settings.filterFields.nextAction,
      valOptions: [],
    },
    {
      label: "Tour Date",
      value: settings.filterFields.tourDate,
      valOptions: [],
    },
  ];

  const handleFieldChange = (field) => {
    setSelectedField(field);
  };

  useEffect(() => {
    // if selected 'All' - show all (no field filter)
    if (selectedField.value === settings.filterFields.all) {
      handleFieldValChange("");
    }

    setFieldValOptions(selectedField.valOptions);
    // Reset selected value when field changes
    setSelectedValue(null);
  }, [selectedField]);

  useEffect(() => {
    filterListByQuery(filters);
  }, [filters, filterListByQuery]);

  const handleFieldValChange = (fieldVal) => {
    setSelectedValue(fieldVal);
    setFilters((prevFilters) => ({
      ...prevFilters,
      field: selectedField.value,
      value: fieldVal.value || "",
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
            value={selectedValue}
            options={fieldValOptions}
            placeholder="Select Filter Value"
          />
        )}
      </div>
    </>
  );
};

export default LeaseTableFilters;
