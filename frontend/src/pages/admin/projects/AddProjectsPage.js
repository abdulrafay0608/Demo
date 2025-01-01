import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddProjectsAction } from "../../../actions/projectsAction";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GetTicketStatusesAction } from "../../../actions/ticketStatusesAction";
import { GetAllUserAction } from "../../../actions/authActions";
import { FaBackward } from "react-icons/fa";
import Input from "../../../components/Utils/Input";
import ReusableSelect from "../../../components/Utils/ReusableSelect";
import Loader from "../../../components/loader/Loader";
import Button from "../../../components/Utils/Button";
import MultiSelect from "../../../components/Utils/MultiSelect";
import DatePicker from "../../../components/Utils/DatePicker";
import TextArea from "../../../components/Utils/TextArea";

const AddProjectsPage = () => {
  const { isAuthenticated, all_user } = useSelector((state) => state?.user);
  const { ticket_statuses } = useSelector((state) => state?.ticket_statuses);
  const { ticket_severity } = useSelector((state) => state?.ticket_severity);
  const { ticket_priority } = useSelector((state) => state?.ticket_priority);
  const { department } = useSelector((state) => state?.department);
  const { service } = useSelector((state) => state?.service);
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
    dispatch(AddProjectsAction(data))
      .unwrap()
      .then(() => {
        toast.success("Projects Create Successfully!");
        navigate("/admin/projects");
      })
      .catch((error) => {
        toast.error(error || "Failed to add ticket. Please try again.");
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
        onClick={() => navigate("/admin/projects")}
        className="text-sm flex items-center border border-gray-500 p-1 rounded-lg max-w-min cursor-pointer"
      >
        <FaBackward />
        <div className="mx-1">Back</div>
      </button>
      <h2 className="font-semibold text-xl m-2">Add New Project</h2>
      <div className="text-sm bg-white border flex flex-col justify-between rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="space-y-4 gap-x-6 p-6">
            <Input
              label="Project Name"
              type="text"
              {...register("project_name", {
                required: "Project Name is required",
              })}
              error={errors.project_name?.message}
              placeholder=""
              className="md:px-4 px-2 py-2"
            />

            <Controller
              name="customer"
              control={control}
              rules={{ required: "Customer is required" }}
              render={({ field }) => (
                <ReusableSelect
                  label={"Customer"}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  options={all_user.map((user) => ({
                    value: user?._id,
                    label: user?.username,
                  }))}
                  error={errors.customer?.message}
                  placeholder=""
                />
              )}
            />

            <div className="flex gap-x-6 w-full">
              <div className="w-1/2">
                {/* Status Select */}
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <ReusableSelect
                      label="Status"
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      options={ticket_statuses.map((status) => ({
                        value: status?._id,
                        label: status?.name,
                      }))}
                      error={errors.status?.message}
                      placeholder="Select Status"
                    />
                  )}
                />

                {/* Start Date Picker */}
                <Controller
                  name="start_date"
                  control={control}
                  rules={{ required: "Start Date is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Start Date"
                      name={field.name}
                      selectedDate={field.value}
                      onChange={field.onChange}
                      error={errors.start_date?.message}
                      className="md:px-4 px-2 py-2"
                    />
                  )}
                />
              </div>
              <div className="w-1/2">
                <Controller
                  name="member"
                  control={control}
                  rules={{ required: "Member is required" }}
                  render={({ field }) => (
                    <MultiSelect
                      label={"Member"}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      options={all_user.map((user) => ({
                        value: user?._id,
                        label: `${user?.username} (Role: ${user?.role})`,
                      }))}
                      isMulti={true}
                      error={errors.member?.message}
                      placeholder=""
                    />
                  )}
                />

                <Controller
                  name="deadline"
                  control={control}
                  rules={{ required: "Deadline is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Deadline"
                      name={field.name}
                      selectedDate={field.value}
                      onChange={field.onChange}
                      error={errors.deadline?.message}
                      className="md:px-4 px-2 py-2"
                    />
                  )}
                />
              </div>
            </div>

            <TextArea
              label="Project Description"
              {...register("project_description")}
              error={errors.project_description?.message}
              placeholder=""
              rows={6}
              className="text-sm md:px-4 px-2 py-2"
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

export default AddProjectsPage;
