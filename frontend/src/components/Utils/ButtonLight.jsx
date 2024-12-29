import React from "react";

const ButtonLight = ({ label, onClick, type, icon, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full border border-gray-500 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center ${className}`}
    >
      {icon}
      <div className="mx-1">{label}</div>
    </button>
  );
};

export default ButtonLight;
