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
import { FaBackward } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddTicketAction } from "../../actions/ticketAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
const TicketEdit = () => {
  const [findTicket, setFindTicket] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const params = useParams();
  const { ticket, loading } = useSelector((state) => state.ticket);
  useEffect(() => {
    const findTicket = ticket.find((e) => e._id === params.id);
    setFindTicket(findTicket);
  }, [ticket]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  return (
    <div className="flex">
      <div className="min-w-min max-w-3xl">
        <div>
          <h2 className="py-3 px-5 min-w-min text-nowrap border border-b-[#808080] bg-white text-black font-semibold">{`#${findTicket?._id} - ${findTicket?.subject}`}</h2>

        </div>
      </div>
      <div className="w-full p-3">
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

                {/* <Select
                label="Contact"
                name="contact"
                options={contacts.map((contact) => ({
                  value: contact?._id,
                  label: contact?.name,
                  _id: contact?._id,
                }))}
                {...register("contact", {
                  required: "Contact is required",
                })}
                error={errors.contact?.message}
                value={selectedCountry}
                onChange={(value) => setSelectedCountry(value)}
                placeholder="Select your contact"
              /> */}
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
                          options={departments.map((depart) => ({
                            value: depart?.department,
                            label: depart?.department,
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
                      options={assignTickets.map((at) => ({
                        value: at?.assign_ticket,
                        label: at?.assign_ticket,
                      }))}
                      error={errors.assign_ticket?.message}
                      placeholder="Select your assign ticket"
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
                    {/* <Select
                    label="Service"
                    name="service"
                    options={contacts.map((contact) => ({
                      value: contact?._id,
                      label: contact?.name,
                      _id: contact?._id,
                    }))}
                    value={""}
                    {...register("priority", {
                      required: "Priority is required",
                    })}
                    error={errors.priority?.message}
                    placeholder="Select your priority"
                  /> */}
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="flex gap-x-6 w-full p-6">
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
                {/* <Select
                label={
                  <>
                    <span className="font-bold">Ticket Body</span>
                  </>
                }
                name="ticket_body"
                options={contacts.map((contact) => ({
                  value: contact?._id,
                  label: contact?.name,
                  _id: contact?._id,
                }))}
                {...register("ticket_body", {
                  required: "Ticket body is required",
                })}
                error={errors.ticket_body?.message}
                value={selectedCountry}
                onChange={(value) => setSelectedCountry(value)}
                placeholder="Insert predefined reply"
              /> */}
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
            </div>
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
                className="text-nowrap px-3 max-w-min mt-6"
                // loading={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketEdit;
