import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetAllCustomersAction,
  UpdateCustomerStatusAction,
} from "../../actions/customersAction";
import { toast } from "react-toastify";

export const StatusSwitch = ({ initialStatus, id }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    // Prevent multiple clicks while processing
    if (isLoading) return;

    const newStatus = !isActive;
    setIsLoading(true);

    try {
      await dispatch(
        UpdateCustomerStatusAction({ id, status: newStatus })
      ).unwrap();
      setIsActive(newStatus);
      await dispatch(GetAllCustomersAction());
      toast.success("Status updated successfully!");
    } catch (err) {
      // Revert the toggle if the API call fails
      toast.error(err?.message || "Status update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      aria-pressed={isActive}
      aria-label={`Toggle status ${isActive ? "active" : "inactive"}`}
      className={`
        relative inline-flex h-6 w-16 items-center rounded-full 
        cursor-pointer transition-colors duration-200 ease-in-out
        ${isActive ? "bg-blue-500" : "bg-gray-300"}
        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white 
          transition duration-200 ease-in-out
          ${isActive ? "translate-x-11" : "translate-x-1"}
          ${isLoading ? "animate-pulse" : ""}
        `}
      />
    </button>
  );
};
