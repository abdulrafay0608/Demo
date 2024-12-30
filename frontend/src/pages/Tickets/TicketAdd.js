import React, { useEffect, useRef } from "react";
import Input from "../../components/Utils/Input";
import { Controller, useForm } from "react-hook-form";
import { FaTag } from "react-icons/fa";
import Button from "../../components/Utils/Button";
import JoditEditor from "jodit-react";
import ReusableSelect from "../../components/Utils/ReusableSelect";
import MultiSelect from "../../components/Utils/MultiSelect";
import { contacts } from "../../components/Utils/constant";
import { FaBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddTicketAction } from "../../actions/ticketAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { GetTicketPriorityAction } from "../../actions/ticketPriorityAction";
import { GetDepartmentsAction } from "../../actions/departmentAction";
import { GetTicketSeverityAction } from "../../actions/ticketSeverityAction";
import { GetServicesAction } from "../../actions/serviceAction";
import { GetTicketStatusesAction } from "../../actions/ticketStatusesAction";
import { GetAllUserAction } from "../../actions/authActions";

const TicketAdd = () => {
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
    dispatch(AddTicketAction(data))
      .unwrap()
      .then(() => {
        toast.success("Ticket added successfully!");
        navigate("/tickets");
      })
      .catch((error) => {
        toast.error(error || "Failed to add ticket. Please try again.");
      });
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
    <div className="my-4 w-full max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/admin4/tickets")}
        className="text-sm flex items-center border border-gray-500 p-1 rounded-lg max-w-min cursor-pointer"
      >
        <FaBackward />
        <div className="mx-1">Back</div>
      </button>
      <h2 className="font-semibold text-xl m-2">Ticket Information</h2>
      <div className="text-sm bg-white border flex flex-col justify-between rounded-lg shadow-lg ">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex gap-x-6 p-6">
            <div className="space-y-4 w-1/2">
              <Input
                label="Subject"
                type="text"
                {...register("subject", {
                  required: "Subject is required",
                })}
                error={errors.subject?.message}
                placeholder="Enter your subject"
                className="md:px-4 px-2 py-2"
              />

              {/* <Controller
                name="contact"
                control={control}
                rules={{ required: "Contact is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label="Contact"
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={contacts.map((contact) => ({
                      value: contact?.contact,
                      label: contact?.contact,
                    }))}
                    error={errors.contact?.message}
                    placeholder="Select your contact"
                  />
                )}
              /> */}
              <div className="flex gap-x-6 w-full">
                <div className="w-1/2">
                  <Input
                    label="Name"
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    error={errors.name?.message}
                    placeholder="Enter your name"
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
                        options={department.map((depart) => ({
                          value: depart?._id,
                          label: depart?.name,
                        }))}
                        error={errors.department?.message}
                        placeholder="Select your department"
                      />
                    )}
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    label="Email address"
                    type="text"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    error={errors.email?.message}
                    placeholder="Enter your name"
                    className="md:px-4 px-2 py-2"
                  />{" "}
                  <Input
                    label="CC"
                    type="text"
                    {...register("cc", {
                      required: "CC is required",
                    })}
                    error={errors.cc?.message}
                    placeholder="Enter your cc"
                    className="md:px-4 px-2 py-2"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <Controller
                name="tag"
                control={control}
                rules={{ required: "Tag is required" }}
                render={({ field }) => (
                  <MultiSelect
                    label={
                      <>
                        <FaTag
                          size={14}
                          className="mr-1 text-gray-700 text-xl"
                        />{" "}
                        Tag
                      </>
                    }
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={contacts.map((contact) => ({
                      value: contact?.name,
                      label: contact?.name,
                    }))}
                    isMulti={true}
                    error={errors.tag?.message}
                    placeholder="Select your tag"
                  />
                )}
              />

              <Controller
                name="assign_ticket"
                control={control}
                rules={{ required: "Assign Ticket is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label={
                      <>
                        Assign ticket
                        <p className="ml-1 text-[13px] text-gray-500">
                          (default is current user)
                        </p>
                      </>
                    }
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={all_user.map((user) => ({
                      value: user?._id,
                      label: user?.username,
                    }))}
                    error={errors.assign_ticket?.message}
                    placeholder="Select your assign ticket"
                  />
                )}
              />
              {/* user?.map((u) => ({
                      value: u?._id,
                      label: u?.username,
                    })) */}
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
                <div className="w-1/2">
                  <Controller
                    name="service"
                    control={control}
                    rules={{ required: "Service is required" }}
                    render={({ field }) => (
                      <ReusableSelect
                        label="Service"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        options={service.map((service) => ({
                          value: service?._id,
                          label: service?.name,
                        }))}
                        error={errors.service?.message}
                        placeholder="Select your service"
                      />
                    )}
                  />
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: "Ticket Status is required" }}
                    render={({ field }) => (
                      <ReusableSelect
                        label="Ticket Status"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        options={ticket_statuses.map((status) => ({
                          value: status?._id,
                          label: status?.name,
                        }))}
                        error={errors.status?.message}
                        placeholder="Select your status"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* <div className="flex gap-x-6 w-full p-6">
            <div className="w-1/2">
              {" "}
              <Controller
                name="ticket_body"
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label={
                      <>
                        <span className="font-bold">Ticket Body</span>
                      </>
                    }
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={ticketBodies.map((body) => ({
                      value: body?.body,
                      label: body?.body,
                    }))}
                    error={errors.ticket_body?.message}
                    placeholder="Insert predefined reply"
                  />
                )}
              />
            </div>
            <div className="w-1/2">
              <Controller
                name="knowledge"
                control={control}
                rules={{ required: "Knowledge base link is required" }}
                render={({ field }) => (
                  <ReusableSelect
                    label={
                      <>
                        <span className="invisible">knowledge</span>
                      </>
                    }
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    options={knowledgeBaseLinks.map((knowledge) => ({
                      value: knowledge.link,
                      label: knowledge.department,
                    }))}
                    error={errors.knowledge?.message}
                    placeholder="Insert knowledge base link"
                  />
                )}
              />
            </div>
          </div> */}
          <div className="flex gap-x-6 w-full px-6">
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <JoditEditor
                  ref={editor}
                  value={field.value || ""}
                  tabIndex={1}
                  onBlur={(content) => field.onChange(content)}
                  config={{
                    readonly: false,
                    height: 250,
                    width: "100%",
                  }}
                  placeholder="Content"
                />
              )}
            />
          </div>
          <div className="flex justify-end items-end p-6">
            <Button
              type="submit"
              label="Open Ticket"
              className="text-nowrap px-3 py-2 max-w-min mt-6"
              // loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketAdd;
