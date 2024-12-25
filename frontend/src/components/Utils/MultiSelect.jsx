import React, { forwardRef } from "react";
import CreatableSelect from "react-select/creatable";
const MultiSelect = forwardRef(
  (
    {
      label,
      name,
      options = [],
      error,
      className = "",
      placeholder = "Select...",
      onChange,
      isMulti = true,
      value,
      ...props
    },
    ref
  ) => {
    const handleCreateOption = (inputValue) => {
      const newOption = { value: inputValue, label: inputValue };
      const newValue = isMulti ? [...(value || []), newOption] : newOption;
      onChange(newValue);
    };
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
          <CreatableSelect
            {...props}
            name={name}
            options={options}
            value={value}
            onChange={onChange}
            onCreateOption={handleCreateOption}
            placeholder={placeholder}
            classNamePrefix="select"
            isMulti={isMulti}
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

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
