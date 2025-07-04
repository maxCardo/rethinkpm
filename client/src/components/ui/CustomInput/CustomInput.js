import "./CustomInput.css";

const CustomInput = ({
  inputId,
  label,
  placeholder,
  inputStyle,
  onChange,
  value,
  readonly = false,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        className="form-control mt-2 custom-input"
        style={inputStyle}
        tabIndex={0}
        // onChange={(e) => onChange}
        placeholder={placeholder || label}
        value={value || ""}
        readOnly={readonly}
      />
    </div>
  );
};

export default CustomInput;
