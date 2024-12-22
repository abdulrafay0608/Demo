import React from "react";

const Button = ({type, label, className }) => {
  return (
    <button
      type={type}
      className={`${className} w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"`}
    >
      {label}
    </button>
  );
};

export default Button;
