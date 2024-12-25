import React, { useState, useEffect, useRef, forwardRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Select = forwardRef(
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
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [dropdownPosition, setDropdownPosition] = useState("bottom"); // "top" or "bottom"

    // Create refs for the dropdown button and container
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    // Filter options based on search query
    const filteredOptions = options.filter(
      (option) =>
        option.label &&
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (selectedValue) => {
      onChange && onChange(selectedValue);
      setIsOpen(false);
      setSearchQuery("");
    };

    // Calculate position of the dropdown
    const updateDropdownPosition = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        // Adjust dropdown position based on available space
        if (spaceBelow >= 300) {
          setDropdownPosition("bottom");
        } else if (spaceAbove >= 300) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
      }
    };

    // Close dropdown if user clicks outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Update dropdown position when the dropdown is opened
    useEffect(() => {
      if (isOpen) {
        updateDropdownPosition();
      }
    }, [isOpen]);

    return (
      <div className="mb-4" ref={dropdownRef}>
        {label && (
          <label
            htmlFor={name}
            className="text-sm flex items-center text-gray-600 font-medium m-0.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {/* Dropdown Button */}
          <button
            ref={buttonRef}
            type="button"
            className={`${
              error ? "border-2 border-red-500" : "border-gray-300"
            } w-full bg-white border rounded-lg px-4 pr-2 py-2 text-left focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}`}
            onClick={() => setIsOpen(!isOpen)}
            {...props}
          >
            {value || placeholder}
            <span className="float-right flex items-center border-l pl-2">
              {isOpen ? (
                <MdKeyboardArrowUp size={20} />
              ) : (
                <MdKeyboardArrowDown size={20} />
              )}
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className={`absolute z-10 w-full p-2 mt-1 bg-white border border-gray-300 rounded-lg shadow-md ${
                dropdownPosition === "top"
                  ? "bottom-full mb-2"
                  : "top-full mt-2"
              }`}
            >
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full placeholder:text-gray-500 placeholder:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:px-4 py-2"
              />

              {/* Filtered Options */}
              <ul className="max-h-48 overflow-y-auto scrollbar-none">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      className="mt-1 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-sm cursor-pointer"
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">No results found</li>
                )}
              </ul>
            </div>
          )}
        </div>
        {error && <p className="ml-1 errorMsg text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
