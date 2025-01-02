import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GetTicketStatusesAction } from "../../../actions/ticketStatusesAction";
import { GetAllUserAction } from "../../../actions/authActions";
import { FaBackward } from "react-icons/fa";
import Input from "../../../components/Utils/Input";
import Loader from "../../../components/loader/Loader";
import Button from "../../../components/Utils/Button";

import TextArea from "../../../components/Utils/TextArea";
import { AddCustomerAction } from "../../../actions/customersAction";

const AddCustomerPage = () => {
  const { isAuthenticated, all_user } = useSelector((state) => state?.user);
  const { loading } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(AddCustomerAction(data))
      .unwrap()
      .then(() => {
        toast.success("Customer Create Successfully!");
        navigate("/admin/customers");
      })
      .catch((error) => {
        toast.error(error || "Failed to add customer. Please try again.");
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      //   dispatch(GetTicketPriorityAction());
      //   dispatch(GetServicesAction());
      //   dispatch(GetDepartmentsAction());
      //   dispatch(GetTicketSeverityAction());
      dispatch(GetTicketStatusesAction());
      dispatch(GetAllUserAction());
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="my-4 w-full max-w-5xl md:mx-auto px-2">
      <button
        onClick={() => navigate("/admin/customers")}
        className="text-sm flex items-center border border-gray-500 p-1 rounded-lg max-w-min cursor-pointer"
      >
        <FaBackward />
        <div className="mx-1">Back</div>
      </button>
      <h2 className="font-semibold text-xl m-2">Add New Customer </h2>
      <div className="text-sm bg-white border flex flex-col justify-between rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="space-y-4 gap-x-6 p-6">
            {/* Customer Name */}
            <Input
              label="Customer Name"
              type="text"
              {...register("customer_name", {
                required: "Customer Name is required",
              })}
              error={errors.customer_name?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />
            <Input
              label="Email Address"
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              error={errors.email?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />
            <Input
              label="Password"
              type="text"
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            {/* Website */}
            <Input
              label="Website"
              type="text"
              {...register("website", {
                required: "Website is required",
              })}
              error={errors.website?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />
            {/* Address */}
            <TextArea
              label="Address"
              {...register("address", {
                required: "Address is required",
              })}
              error={errors.address?.message}
              placeholder=""
              rows={3}
              className="text-sm md:px-4 px-2 py-2"
            />

            {/* Phone Number */}
            <Input
              label="Phone #"
              type="text"
              {...register("phone", {
                required: "Phone # is required",
              })}
              error={errors.phone?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            {/* Mobile Number */}
            <Input
              label="Mobile #"
              type="text"
              {...register("mobile", {
                required: "Mobile # is required",
              })}
              error={errors.mobile?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            {/* Email Address */}

            {/* NTN # */}
            <Input
              label="NTN #"
              type="text"
              {...register("ntn", {
                required: "NTN # is required",
              })}
              error={errors.ntn?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            {/* STRN # */}
            <Input
              label="STRN #"
              type="text"
              {...register("strn", {
                required: "STRN # is required",
              })}
              error={errors.strn?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            {/* VAT # */}
            <Input
              label="VAT #"
              type="text"
              {...register("vat", {
                required: "VAT # is required",
              })}
              error={errors.vat?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />
          </div>

          <div className="flex justify-end items-end p-6">
            <Button
              type="submit"
              label="Save"
              className="text-nowrap px-3 py-2 max-w-min mt-6"
              // loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerPage;
