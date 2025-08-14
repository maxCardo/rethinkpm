import "./CustomInput.css";

const CustomInput = ({
  inputId,
  label,
  placeholder,
  inputStyle,
  onChange,
  value,
  readonly = false,
  type,
  appendIcon,
  onAppendClick,
  hasError = false,
  errorMessage = "",
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={inputId}>{label}</label>
      <div className="relative flex items-center">
        <input
          id={inputId}
          className={`form-control my-2 custom-input ${
            appendIcon ? "pr-10" : ""
          }`}
          style={{
            ...inputStyle,
            borderColor: hasError ? "red" : undefined,
          }}
          tabIndex={0}
          onChange={onChange}
          placeholder={placeholder || label}
          value={value || ""}
          readOnly={readonly}
          type={type}
        />
        {appendIcon && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
            <span
              className={`append-icon ${onAppendClick ? "cursor-pointer" : ""}`}
              onClick={onAppendClick}
            >
              {appendIcon}
            </span>
          </div>
        )}
      </div>
      {hasError && errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default CustomInput;
