import { useState, useEffect, useMemo, useCallback } from "react";
import Select from "react-select";
import {
  capitalizeFirstLetter,
  getFormattedDate,
} from "../../../../util/commonFunctions";
import { useDebounce } from "../../../../util/hooks";
import CustomInput from "../../../ui/CustomInput/CustomInput";

const LeadsTableFilters = ({ filterListByQuery, settings }) => {
  const DEFAULT_DATE = new Date(); // today

  const [selectedField, setSelectedField] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);
  const [fieldValOptions, setFieldValOptions] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    field: "",
    value: "",
    startDate: getFormattedDate(DEFAULT_DATE).ISO, // Today
    endDate: getFormattedDate(DEFAULT_DATE).ISO, // Today
  });

  // Debounce the search input with 500ms delay
  const debouncedSearchTerm = useDebounce(filters.search, 500);

  // Memoized debounced filters object
  const debouncedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearchTerm,
    }),
    [filters, debouncedSearchTerm]
  );

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
    {
      label: "Owner",
      value: settings.filterFields.leadOwner,
      valOptions: [{ label: "System", value: "System" }],
    },
    {
      label: "Next Action Date",
      type: "date",
      value: settings.filterFields.nextAction,
      valOptions: [],
    },
    // TODO: tour date
    // {
    //   label: "Tour Date",
    //   value: settings.filterFields.tourDate,
    //   valOptions: [],
    // },
  ];

  const handleFieldChange = (field) => {
    setSelectedField(field);
  };

  const handleFieldValChange = useCallback(
    (fieldVal) => {
      setSelectedValue(fieldVal);
      setFilters((prevFilters) => ({
        ...prevFilters,
        field: selectedField.value,
        value: fieldVal.value || "",
      }));
    },
    [selectedField.value]
  );

  useEffect(() => {
    // if selected 'All' - show all (no field filter)
    if (selectedField.value === settings.filterFields.all) {
      handleFieldValChange("");
    }

    setFieldValOptions(selectedField.valOptions);
    // Reset selected value when field changes
    setSelectedValue(null);

    // Reset date filters when field changes to non-date field
    if (selectedField.type !== "date") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        startDate: "",
        endDate: "",
      }));
    } else {
      // Reset value filter and restore default dates when switching to date field
      setFilters((prevFilters) => ({
        ...prevFilters,
        value: "",
        startDate: getFormattedDate(DEFAULT_DATE).ISO, // Yesterday
        endDate: getFormattedDate(DEFAULT_DATE).ISO, // Today
      }));
    }
  }, [selectedField, handleFieldValChange, settings.filterFields.all]);

  useEffect(() => {
    // Call API with debounced search term and immediate field/value changes
    filterListByQuery(debouncedFilters);
  }, [debouncedFilters, filterListByQuery]);

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

  const handleDateChange = (dateType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dateType]: value,
      // When using date filters, set the field to nextAction
      field: selectedField.value || settings.filterFields.nextAction,
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
        {fieldValOptions?.length > 0 && selectedField.type !== "date" && (
          <Select
            className="marketplace__filter-select"
            onChange={handleFieldValChange}
            value={selectedValue}
            options={fieldValOptions}
            placeholder="Select Filter Value"
          />
        )}
        {selectedField.type === "date" && (
          <div className="date-filter-container flex gap-2 items-center">
            <CustomInput
              inputId={"start"}
              type={selectedField.type}
              value={filters.startDate}
              onChange={(e) => handleDateChange("startDate", e.target.value)}
              placeholder="Start Date"
              style={{ minWidth: "150px" }}
            />
            <span className="text-gray-500">to</span>
            <CustomInput
              inputId={"end"}
              type={selectedField.type}
              value={filters.endDate}
              onChange={(e) => handleDateChange("endDate", e.target.value)}
              placeholder={getFormattedDate(new Date()).ISO}
              style={{ minWidth: "150px" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LeadsTableFilters;
