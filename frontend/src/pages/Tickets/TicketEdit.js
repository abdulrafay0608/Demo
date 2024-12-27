import React, { useEffect, useMemo, useRef, useState } from "react";
import Input from "../../components/Utils/Input";
import { Controller, useForm } from "react-hook-form";
import { FaTag } from "react-icons/fa";
import Button from "../../components/Utils/Button";
import JoditEditor from "jodit-react";
import ReusableSelect from "../../components/Utils/ReusableSelect";
import MultiSelect from "../../components/Utils/MultiSelect";
import {
  assignTickets,
  contacts,
  departments,
  knowledgeBaseLinks,
  priorities,
  services,
  ticketBodies,
} from "../../components/Utils/constant";
import { TiArrowBack } from "react-icons/ti";
import { FaBackward } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AddTicketAction,
  GetSingleTicketAction,
  UpdateStatusAction,
} from "../../actions/ticketAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { SlSupport } from "react-icons/sl";
import { MdOutlineTaskAlt } from "react-icons/md";
import moment from "moment";

const TicketEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const editor = useRef(null);
  const { singleTicket, loading } = useSelector((state) => state?.ticket);
  const [selectedStatus, setSelectedStatus] = useState(singleTicket?.status);
  useEffect(() => {
    const getSingleTicket = async () => {
      try {
        // console.log("ticket", ticket);
        await dispatch(GetSingleTicketAction(params.id)).unwrap();
        // toast.success("Ticket deleted successfully!");
        // await dispatch(GetTicketAction()); // Reload the tickets
      } catch (error) {
        toast.error(error || "Edit Request failed. Please try again.");
      }
    };
    getSingleTicket();
  }, []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);

    dispatch(UpdateStatusAction({ id: params.id, selectedStatus: newStatus }))
      .unwrap()
      .then(() => {
        toast.success("Status updated successfully!");
      })
      .catch((err) => {
        toast.error(err || "Status update failed. Please try again.");
      });
  };

  const onSubmit = (data) => {};
  // dispatch(AddTicketAction(data))
  //   .unwrap()
  //   .then(() => {
  //     toast.success("Ticket added successfully!");
  //     navigate("/tickets");
  //   })
  //   .catch((error) => {
  //     toast.error(error || "Failed to add ticket. Please try again.");
  //   });

  // if (loading) {
  //   return <Loader />;
  // }
  const statusColors = {
    Open: "border-red-500 text-red-500",
    "In Progress": "border-green-500 text-green-500",
    Answered: "border-blue-500 text-blue-500",
    "On Hold": "border-gray-500 text-gray-500",
    Closed: "border-blue-400 text-blue-400",
  };
  return (
    <div>
      <div className="flex justify-between items-center w-full border-b border-[#808080] bg-white">
        <div className="w-2/3 flex items-center gap-x-2 max-w-md">
          <h2 className="min-w-min text-nowrap text-black font-semibold text-base py-4 px-5">
            {`#${singleTicket?._id} - ${singleTicket?.subject}`}
          </h2>
          <select
            className={`text-sm bg-transparent p-1 rounded-md font-inherit border outline-none shadow-lg ${statusColors[selectedStatus]}`}
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e)}
          >
            {["Open", "In Progress", "Answered", "On Hold", "Closed"].map(
              (status) => (
                <option
                  className="text-black bg-white"
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              )
            )}
          </select>
        </div>
        <div className="w-1/3 flex items-center gap-x-2 max-w-md border-l border-[#808080] py-4 px-5">
          <h2 className="min-w-min text-black font-semibold text-base ">
            Ticket Information
          </h2>
          <Button
            type="submit"
            label="Save"
            className="text-nowrap text-[13px] py-1 px-3 max-w-min"
            // loading={loading}
          />
        </div>
      </div>
      <div className="flex justify-between  w-full">
        <div className="w-2/3 p-3">
          <div className="flex items-center gap-x-2 bg-[#E9EAED] p-1 rounded mt-6 w-full">
            <button className="flex justify-center gap-x-1 text-nowrap font-semibold text-sm bg-white p-2 px-3 rounded">
              <TiArrowBack size={18} />
              Add Reply
            </button>
            <button className="flex justify-center gap-x-1 items-center text-nowrap font-semibold text-sm bg-white py-2 px-3 rounded">
              <FaRegNoteSticky size={18} />
              Add Note
            </button>
            <button className="flex justify-center gap-x-1 items-center text-nowrap font-semibold text-sm bg-white py-2 px-3 rounded">
              <FaRegBell size={18} />
              Reminders
            </button>
            <button className="flex justify-center gap-x-1 items-center text-nowrap font-semibold text-sm bg-white py-2 px-3 rounded">
              <SlSupport size={18} />
              Other Tickets
            </button>
            <button className="flex justify-center gap-x-1 items-center text-nowrap font-semibold text-sm bg-white py-2 px-3 rounded">
              <MdOutlineTaskAlt size={18} />
              Tasks
            </button>
          </div>
          <div className="bg-white border shadow-md rounded-md my-4 p-3">
            <div className="bg-[#F9FAFB] rounded-md mb-4 p-3 ">
              <p className="text-sm flex gap-x-1 font-bold items-center mt-4">
                <FaRegNoteSticky size={18} />
                Note
              </p>
              <div className="flex items-center gap-x-2">
                <img
                  className="size-6 object-contain rounded-full"
                  src="https://perfexcrm.com/demo/assets/images/user-placeholder.jpg"
                  alt=""
                />
                <div>
                  <h6 className="text-sm">{singleTicket?.ticket_body}</h6>
                  <p className="text-[12px]">
                    Note added:{" "}
                    {moment(singleTicket?.createdAt).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </div>
              </div>
              <div
                className="text-sm mt-2"
                dangerouslySetInnerHTML={{
                  __html: singleTicket?.body,
                }}
              ></div>
            </div>
            <div className="flex gap-x-4 w-full">
              <div className="w-1/2">
                {" "}
                <Controller
                  name="ticket_body"
                  control={control}
                  rules={{ required: "Priority is required" }}
                  render={({ field }) => (
                    <ReusableSelect
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      options={ticketBodies.map((body) => ({
                        value: body?.body,
                        label: body?.body,
                      }))}
                      className={"text-sm"}
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
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      options={knowledgeBaseLinks.map((knowledge) => ({
                        value: knowledge.link,
                        label: knowledge.department,
                      }))}
                      className={"text-sm"}
                      error={errors.knowledge?.message}
                      placeholder="Insert knowledge base link"
                    />
                  )}
                />
              </div>
            </div>
            <div className="">
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
          </div>
        </div>

        <div className="w-1/3 ">
          <div className="text-sm bg-white flex flex-col justify-between border border-l-[#808080]">
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <div className="p-3">
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
                <Controller
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
                />
                <div className="flex gap-x-3 w-full">
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
                    />
                  </div>
                </div>
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
                      options={departments.map((depart) => ({
                        value: depart?.department,
                        label: depart?.department,
                      }))}
                      error={errors.department?.message}
                      placeholder="Select your department"
                    />
                  )}
                />
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
                      options={assignTickets.map((at) => ({
                        value: at?.assign_ticket,
                        label: at?.assign_ticket,
                      }))}
                      error={errors.assign_ticket?.message}
                      placeholder="Select your assign ticket"
                    />
                  )}
                />

                <div className="flex gap-x-3 w-full">
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
                          options={priorities.map((priority) => ({
                            value: priority?.priority,
                            label: priority?.priority,
                          }))}
                          error={errors.priority?.message}
                          placeholder="Select your Priority"
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
                          options={services.map((service) => ({
                            value: service?.service,
                            label: service?.service,
                          }))}
                          error={errors.service?.message}
                          placeholder="Select your service"
                        />
                      )}
                    />
                  </div>
                </div>
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
                <Controller
                  name="knowledge"
                  control={control}
                  rules={{ required: "Knowledge base link is required" }}
                  render={({ field }) => (
                    <ReusableSelect
                      label={"Project"}
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
                <Controller
                  name="knowledge"
                  control={control}
                  rules={{ required: "Knowledge base link is required" }}
                  render={({ field }) => (
                    <ReusableSelect
                      label={"Merge Ticket #"}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketEdit;
