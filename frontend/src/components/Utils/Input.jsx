// Input.jsx
import React from "react";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      name,
      error,
      className = "",
      placeholder = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-4">
        {label && (
          <label
            htmlFor={name}
            className="text-sm block text-gray-600 font-medium m-0.5"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          className={`${
            error ? "border-2 border-red-500" : "border-gray-300"
          } w-full placeholder:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
          {...props}
        />
        {error && <p className="ml-1 errorMsg text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
