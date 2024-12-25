import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const COL_TICKETS = [
  { Header: "# ID", accessor: "_id" },
  {
    Header: "Subject",
    accessor: "subject",
    Cell: ({ value, row }) => {
      // Call useNavigate inside a functional component
      const navigate = useNavigate(); // Hook should be called inside a component

      return (
        <div>
          <span>{value}</span>
          <div className="flex gap-x-1">
            <button
              onClick={() => navigate(`/tickets/view/${row.original._id}`)} // View route
              className="text-[12px]"
            >
              View
            </button>
            |
            <button
              onClick={() => navigate(`/tickets/edit/${row.original._id}`)} // Edit route
              className="text-[12px]"
            >
              Edit
            </button>
            |
            <button
              onClick={() => navigate(`/tickets/delete/${row.original._id}`)} // Delete route
              className="text-[12px]"
            >
              Delete
            </button>
          </div>
        </div>
      );
    },
  },
  {
    Header: "Tags",
    accessor: "tag",
    Cell: ({ value }) => <>{value.map((tag) => tag.label).join(", ")}</>,
  },
  { Header: "Department", accessor: "department" },
  { Header: "Service", accessor: "service" },
  { Header: "Contact", accessor: "contact" },
  { Header: "Status", accessor: "status" },
  { Header: "Priority", accessor: "priority" },
  {
    Header: "Last Reply",
    accessor: "updatedAt",
    Cell: ({ value }) => (
      <>
        {moment(value).format("YYYY-MM-DD")}
        <br />
        {moment(value).format("HH:mm:ss")}
      </>
    ),
  },
  {
    Header: "Created",
    accessor: "createdAt",
    Cell: ({ value }) => (
      <>
        {moment(value).format("YYYY-MM-DD")}
        <br />
        {moment(value).format("HH:mm:ss")}
      </>
    ),
  },
];
