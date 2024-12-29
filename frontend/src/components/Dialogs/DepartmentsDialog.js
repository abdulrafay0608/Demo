import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Utils/Input";
import Button from "../Utils/Button";
import ButtonLight from "../Utils/ButtonLight";
import { IoMdClose } from "react-icons/io";

const DepartmentDialog = ({ isEdit, initialData, handleClose, onSubmit }) => {
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
            {isEdit ? "Edit Department" : "New Department"}
          </h3>
          <IoMdClose onClick={handleClose} className="text-lg cursor-pointer" />
        </div>
        <hr />
        <form
          onSubmit={handleSubmit((data) => {
            if (typeof onSubmit === "function") {
              onSubmit(data);
            } else {
              console.error("onSubmit is not provided or is not a function");
            }
          })}
          className=""
        >
          <div className="p-6 space-y-8">
            <Input
              label="Department Name"
              type="text"
              {...register("name", {
                required: "Department Name is required",
              })}
              error={errors.name?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            <Input
              label="Department Email"
              type="email"
              {...register("department_email", {
                required: "Department Email is required",
              })}
              error={errors.department_email?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
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

export default DepartmentDialog;
