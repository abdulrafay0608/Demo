import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Utils/Input";
import Button from "../Utils/Button";
import ButtonLight from "../Utils/ButtonLight";
import { IoMdClose } from "react-icons/io";
import { HexColorPicker } from "react-colorful";

const TicketStatusesDialog = ({
  isEdit,
  initialData,
  handleClose,
  onSubmit,
}) => {
  const [color, setColor] = useState(
    initialData ? initialData.color : "#000000"
  ); // Default color
  const [showPicker, setShowPicker] = useState(false); // Toggle for color picker

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (isEdit && initialData) {
      reset(initialData);
    }
  }, [isEdit, initialData, reset]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-gray-500 opacity-75"
      ></div>

      {/* Modal container */}
      <div className="text-black bg-white rounded-xl shadow-xl transform transition-all md:max-w-xl w-full max-h-screen overflow-auto scrollbar-none ">
        <div className="flex justify-between items-center p-5 w-full text-base font-semibold">
          <h3 className="text-center">
            {isEdit ? "Edit Ticket Status" : "New Ticket Status"}
          </h3>
          <IoMdClose onClick={handleClose} className="text-lg cursor-pointer" />
        </div>
        <hr />
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="">
          <div className="p-6 space-y-8">
            <Input
              label="Ticket Status Name"
              type="text"
              {...register("name", {
                required: "Ticket Status Name is required",
              })}
              error={errors.name?.message}
              placeholder=""
              className="md:px-4 px-2 py-2 text-sm"
            />
            <div className="mb-4 relative">
              <label className="text-sm block text-gray-600 font-medium m-0.5">
                Pick Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={color}
                  {...register("color", {
                    required: "Color code is required",
                    validate: (value) =>
                      /^#([0-9A-F]{3}){1,2}$/i.test(value) ||
                      "Invalid color code",
                  })}
                  onChange={(e) => setColor(e.target.value)} // Update color based on user input
                  className={`${
                    errors.color?.message
                      ? "border-2 border-red-500"
                      : "border-gray-300"
                  } flex-1 placeholder:text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none md:px-4 px-2 py-2 text-sm`} // Reduced padding and font size
                />

                <div
                  className="w-8 h-8 rounded border cursor-pointer"
                  style={{ backgroundColor: color }}
                  onClick={() => setShowPicker(!showPicker)}
                ></div>
              </div>

              {/* Color Picker */}
              {showPicker && (
                <div
                  className="absolute right-0 bg-white p-2 rounded shadow-md"
                  style={{
                    width: "120px",
                    height: "120px", // Adjust the size of the color picker
                  }}
                >
                  <HexColorPicker
                    color={color}
                    onChange={(newColor) => setColor(newColor)}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              )}

              {/* Error Message */}
              {errors.color?.message && (
                <p className=" ml-1 text-red-500 text-sm">
                  {errors.colorCode?.message}
                </p>
              )}
            </div>

            <Input
              label="Status Order"
              type="number"
              {...register("order", {
                required: "Status order is required",
              })}
              error={errors.order?.message}
              placeholder=""
              className="md:px-4 px-2 py-2 text-sm"
            />
            <div className="flex justify-end gap-x-2 px-4 mt-6">
              <div>
                <ButtonLight
                  label={"Close"}
                  type={"button"}
                  onClick={handleClose}
                  className={"text-sm mx-4 py-2"}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  label={isEdit ? "Edit" : "Save"}
                  className="text-sm mx-4 py-2"
                  //   loading={loading}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketStatusesDialog;
