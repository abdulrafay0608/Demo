import React, { useEffect, useRef } from "react";
import Input from "../../components/Utils/Input";
import { Controller, useForm } from "react-hook-form";
import Button from "../../components/Utils/Button";
import ReusableSelect from "../../components/Utils/ReusableSelect";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import { GetTicketPriorityAction } from "../../actions/ticketPriorityAction";
import { GetDepartmentsAction } from "../../actions/departmentAction";
import { GetTicketSeverityAction } from "../../actions/ticketSeverityAction";
import { GetServicesAction } from "../../actions/serviceAction";
import { GetTicketStatusesAction } from "../../actions/ticketStatusesAction";
import { GetAllUserAction } from "../../actions/authActions";
import TextArea from "../../components/Utils/TextArea";

const UserAddTicketPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state?.user);
  const { ticket_severity } = useSelector((state) => state?.ticket_severity);
  const { ticket_priority } = useSelector((state) => state?.ticket_priority);
  const { department } = useSelector((state) => state?.department);
  const { loading } = useSelector((state) => state.ticket);
  const { userProjects } = useSelector((state) => state.projects);
  const { ticket_statuses } = useSelector((state) => state?.ticket_statuses);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue, // To programmatically set values
  } = useForm({
    defaultValues: {
      severity: "Medium",
      priority: "P4",
      status: "Open",
      created_by: user._id,
    },
  });
  useEffect(() => {
    const defaultSeverity = ticket_severity.find(
      (sev) => sev.name === "Medium"
    );
    const defaultPriority = ticket_priority.find((pri) => pri.name === "P4");
    const defaultStatus = ticket_statuses.find((sta) => sta.name === "Open");

    if (defaultSeverity) {
      setValue("severity", defaultSeverity._id);
    }
    if (defaultPriority) {
      setValue("priority", defaultPriority._id);
    }
    if (defaultStatus) {
      setValue("status", defaultStatus._id);
    }
  }, [ticket_severity, ticket_priority, ticket_statuses, setValue]);

  const onSubmit = (data) => {
    console.log("data", data);
    // dispatch(AddTicketAction(data))
    //   .unwrap()
    //   .then(() => {
    //     toast.success("Ticket added successfully!");
    //     navigate("/clients/tickets");
    //   })
    //   .catch((error) => {
    //     toast.error(error || "Failed to add ticket. Please try again.");
    //   });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(GetTicketPriorityAction());
      dispatch(GetServicesAction());
      dispatch(GetDepartmentsAction());
      dispatch(GetTicketSeverityAction());
      dispatch(GetTicketStatusesAction());
      dispatch(GetAllUserAction());
    }
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="my-4 w-full max-w-5xl sm:mx-auto px-2">
      <button
        onClick={() => navigate("/clients/tickets")}
        className="text-sm flex items-center border border-gray-500 p-1 rounded-lg max-w-min cursor-pointer"
      >
        <FaBackward />
        <div className="mx-1">Back</div>
      </button>
      <h2 className="font-semibold text-xl m-2">Open Ticket</h2>
      <div className="text-sm bg-white border flex flex-col justify-between rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className=" gap-x-6 p-6">
            <div className="space-y-4">
              <Input
                label="Subject"
                type="text"
                {...register("subject", {
                  required: "Subject is required",
                })}
                error={errors.subject?.message}
                placeholder=""
                className="text-sm md:px-4 px-2 py-2"
              />
              {/* <Input
                label="Project"
                type="text"
                {...register("project", {
                  required: "Project is required",
                })}
                error={errors.project?.message}
                placeholder="Enter your project"
                className="text-sm md:px-4 px-2 py-2"
              /> */}
              <Controller
                name="project"
                control={control}
                rules={{ required: "Project is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label="Project"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={userProjects.map((project) => ({
                      value: project?._id,
                      label: project?.project_name,
                    }))}
                    error={errors.project?.message}
                    placeholder=""
                  />
                )}
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
                    options={department.map((depart) => ({
                      value: depart?._id,
                      label: depart?.name,
                    }))}
                    error={errors.department?.message}
                    placeholder=""
                  />
                )}
              />
              <div className="flex gap-x-6 w-full">
                <div className="w-1/2">
                  <Controller
                    name="priority"
                    control={control}
                    rules={{ required: "Priority is required" }}
                    render={({ field }) => (
                      <ReusableSelect
                        label="Priority"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        options={ticket_priority.map((priority) => ({
                          value: priority?._id,
                          label: priority?.name,
                        }))}
                        error={errors.priority?.message}
                        placeholder="Select your Priority"
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Controller
                    name="severity"
                    control={control}
                    rules={{ required: "Severity is required" }}
                    render={({ field }) => (
                      <ReusableSelect
                        label="Severity"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        options={ticket_severity.map((severity) => ({
                          value: severity?._id,
                          label: severity?.name,
                        }))}
                        error={errors.severity?.message}
                        placeholder="Select your severity"
                      />
                    )}
                  />
                </div>
              </div>

              <TextArea
                label="Description"
                {...register("ticket_description")}
                error={errors.ticket_description?.message}
                placeholder=""
                rows={6}
                className="text-sm md:px-4 px-2 py-2"
              />
            </div>
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

export default UserAddTicketPage;
