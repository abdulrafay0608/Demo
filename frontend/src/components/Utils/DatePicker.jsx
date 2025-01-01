import React, { useState } from "react";
import { forwardRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = forwardRef(
  ({ label, name, error, value, onChange, className = "" }, ref) => {
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
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${
            error ? "border-2 border-red-500" : "border-gray-300"
          } w-full placeholder:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
        />
        {error && <p className="ml-1 errorMsg text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
