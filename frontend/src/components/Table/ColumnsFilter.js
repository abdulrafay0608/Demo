import React from "react";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      type="text"
      className="py-1 px-2 border-gray-300 outline-gray-500 w-full"
      value={filterValue || ""}
      onChange={(e) => {
        if (filterValue !== e.target.value) {
          setFilter(e.target.value);
        }
      }}
    />
  );
};

export default ColumnFilter;
