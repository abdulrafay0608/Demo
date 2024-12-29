import React from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../../components/Utils/Input";
import Button from "../../components/Utils/Button";
import ReusableSelect from "../../components/Utils/ReusableSelect";
import { SignUpAction } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const roles = [
  { role: "admin", label: "Admin" },
  { role: "user", label: "User" },
];

const RegisterPage = () => {
  const { loading } = useSelector((state) => state.user);
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
        toast.success("Register successful!");
      })
      .catch((err) => {
        toast.error(err || "Register failed. Please try again.");
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="my-8 w-full max-w-5xl md:mx-auto mx-2">
      <h2 className="font-semibold text-xl m-2">Register Form</h2>
      <div className="text-sm bg-white border flex flex-col justify-between rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex gap-x-6 p-6">
            <div className="space-y-4 w-1/2">
              <Input
                label="Username"
                type="text"
                {...register("username", {
                  required: "UserName is required",
                })}
                error={errors?.username?.message}
                placeholder="Enter your subject"
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
                placeholder="Enter your email"
                className="md:px-4 px-2 py-2"
              />
              <Input
                label="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={errors.password?.message}
                placeholder="Enter your password"
                className="md:px-4 px-2 py-2"
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
              label="Register"
              className="text-nowrap px-3 py-2 max-w-min "
              // loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
