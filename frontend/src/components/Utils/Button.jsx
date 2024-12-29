import React from "react";

const Button = ({ type, label, className, icon, loading }) => {
  return (
    <button
      type={type}
      className={`${className} w-full bg-black border border-black hover:bg-gray-600 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center`}
      disabled={loading} // Disable button while loading
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
          ></path>
        </svg>
      ) : null}
      {icon}
      <div className="mx-1">{label}</div>
    </button>
  );
};

export default Button;
