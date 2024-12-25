import React, { forwardRef } from "react";
import Select from "react-select";

const ReusableSelect = forwardRef(
  (
    {
      label,
      name,
      options = [],
      error,
      className = "",
      placeholder = "Select...",
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={name}
            className="text-sm flex items-center text-gray-600 font-medium m-0.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <Select
            {...props}
            name={name}
            options={options}
            value={options.find((opt) => opt.value === value)}
            onChange={(selectedOption) => onChange(selectedOption?.value)}
            placeholder={placeholder}
            classNamePrefix="select"
            className={`${
              error ? "border-2 border-red-500" : "border-gray-300"
            } w-full text-nowrap placeholder:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
            styles={{
              control: (provided) => ({
                ...provided,
                border: "none",
                borderRadius: "8px",
              }),
            }}
          />

          {error && (
            <p className="ml-1 errorMsg text-red-500 text-sm">{error}</p>
          )}
        </div>
      </div>
    );
  }
);

ReusableSelect.displayName = "ReusableSelect";

export default ReusableSelect;

