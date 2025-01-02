import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Utils/Input";
import Button from "../../components/Utils/Button";
import ReusableSelect from "../../components/Utils/ReusableSelect";
import { SignUpAction } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { GetDepartmentsAction } from "../../actions/departmentAction";

const roles = [
  { role: "admin", label: "Admin" },
  { role: "user", label: "User" },
  { role: "manager", label: "Manager" },
];

const RegisterPage = () => {
  const { loading } = useSelector((state) => state.user);
  const { department } = useSelector((state) => state?.department);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(SignUpAction(data))
      .unwrap()
      .then(() => {
        toast.success("Staff create successful!");
      })
      .catch((err) => {
        toast.error(err || "Register failed. Please try again.");
      });
  };

  useEffect(() => {
    dispatch(GetDepartmentsAction());
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="my-8 w-full max-w-5xl md:mx-auto mx-2">
      <h2 className="font-semibold text-xl m-2">Staff Form</h2>
      <div className="text-sm bg-white border flex flex-col justify-between rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex gap-x-6 p-6">
            <div className="space-y-4 w-full">
              <Input
                label="First Name"
                type="text"
                {...register("first_name", {
                  required: "First Name is required",
                })}
                error={errors?.first_name?.message}
                placeholder=""
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Last Name"
                type="text"
                {...register("last_name", {
                  required: "Last Name is required",
                })}
                error={errors?.last_name?.message}
                placeholder=""
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Email Address"
                type="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                error={errors?.email?.message}
                placeholder=""
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Password"
                type="text"
                {...register("password", {
                  required: "Password is required",
                })}
                error={errors?.password?.message}
                placeholder=""
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Phone #"
                type="text"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                error={errors?.phone?.message}
                placeholder=""
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Mobile #"
                type="text"
                {...register("mobile", {
                  required: "Mobile number is required",
                })}
                error={errors?.mobile?.message}
                placeholder=""
                className="md:px-4 px-2 py-2"
              />

              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label="Department"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={department.map((department) => ({
                      value: department?._id,
                      label: department?.name,
                    }))}
                    error={errors?.department?.message}
                    placeholder=""
                  />
                )}
              />
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label="Roles"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={roles.map((role) => ({
                      value: role?.role,
                      label: role?.label,
                    }))}
                    error={errors.role?.message}
                    placeholder="Select your role"
                  />
                )}
              />
            </div>
          </div>

          <div className="p-6 pt-0">
            <Button
              type="submit"
              label="Save Staff"
              className="text-nowrap px-3 py-2 max-w-min"
              // loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
