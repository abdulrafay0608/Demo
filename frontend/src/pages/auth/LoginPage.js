import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Utils/Input";
import Button from "../../components/Utils/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../actions/authActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, error, navigate]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(LoginAction(data))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err || "Login failed. Please try again.");
      });
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: 'url("/asset/loginbanner.webp")',
      }}
    >
      <div className="absolute h-screen w-full bg-gradient-to-l from-transparent to-black/80"></div>
      {/* Transparent Form Container */}
      <div className="absolute inset-0 flex items-center md:justify-start ml-0 md:ml-40 justify-center md:px-4 px-2">
        <div className="bg-black/60 bg-opacity-80 border border-slate-700 rounded-lg shadow-lg md:p-8 p-4 pb-12 w-full max-w-md">
          <h1 className="md:text-3xl text-2xl font-bold text-white mb-4 text-center">
            Abdul Rafay Tech
          </h1>
          <div className="bg-white bg-opacity-80 rounded-lg shadow-lg md:p-8 p-4 pb-12 w-full">
            <div className="mb-8 text-center">
              <h2 className="md:text-2xl text-xl font-bold text-gray-700 ">
                Login
              </h2>
              <p className=" text-sm m-0 p-0 md:text-nowrap">
                Welcome, please sign in to your dashboard
              </p>
            </div>
            {/* Login Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="max-w-md mx-auto mt-6"
            >
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

              <Button
                type="submit"
                label="Login"
                className="mt-8 py-2"
                loading={loading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
