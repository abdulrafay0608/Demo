import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Utils/Input";
import Button from "../components/Utils/Button";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://m.foolcdn.com/media/the-blueprint/images/GettyImages-1245953309.original.jpg")',
      }}
    >
      <div className="absolute h-screen w-full bg-gradient-to-bl from-black/10 to-black/80"></div>
      {/* Transparent Form Container */}
      <div className="absolute inset-0 flex items-center md:justify-start ml-0 md:ml-40 justify-center md:px-4 px-2">
        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg md:p-8 p-4 pb-12 w-full max-w-md">
          <h1 class="md:text-3xl text-2xl font-bold text-black mb-4 text-center">
            Abdul Rafay Tech
          </h1>
          <h2 class="md:text-2xl text-xl font-bold text-gray-700 mb-6 text-center">
            Login
          </h2>
          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto mt-6"
          >
            <Input
              label="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              error={errors.username?.message}
              placeholder="Enter your username"
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

            <Button type="submit" label="Login" className="mt-6" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
