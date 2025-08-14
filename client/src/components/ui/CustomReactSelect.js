import Select from "react-select";

const CustomReactSelect = ({
  label,
  options = [],
  value,
  onChange,
  isDisabled = false,
  placeholder = "Select...",
  isMulti = false,
  styles = {},
  selectId,
  ...props
}) => {
  const defaultStyles = {
    container: (base) => ({ ...base, width: "100%", marginTop: "8px" }),
    control: (base) => ({ ...base, minHeight: 40, borderRadius: 6 }),
    menu: (base) => ({ ...base, width: "100%" }),
    ...styles,
  };

  return (
    <div className="flex flex-col">
      {label && <label htmlFor={selectId}>{label}</label>}
      <Select
        inputId={selectId}
        options={options}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        placeholder={placeholder}
        isMulti={isMulti}
        styles={defaultStyles}
        {...props}
      />
    </div>
  );
};

export default CustomReactSelect;
