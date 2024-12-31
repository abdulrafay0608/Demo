// TextArea.jsx
import React from "react";
import { forwardRef } from "react";

const TextArea = forwardRef(
  (
    {
      label,
      name,
      error,
      className = "",
      placeholder = "",
      rows = 4,
      cols = 50,
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
        <textarea
          id={name}
          name={name}
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          cols={cols}
          className={`${
            error ? "border-2 border-red-500" : "border-gray-300"
          } w-full placeholder:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
          {...props}
        ></textarea>
        {error && <p className="ml-1 errorMsg text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
