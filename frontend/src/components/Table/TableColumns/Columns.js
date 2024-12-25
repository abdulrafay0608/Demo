import { Link } from "react-router-dom";
import moment from "moment";

export const COL_TICKETS = [
  { Header: "# ID", accessor: "_id" },
  {
    Header: "Subject",
    accessor: "subject",
    Cell: ({ value, row }) => {
      return (
        <div className="main">
          <span>{value}</span>
          <div className="invisible hover:visible subject-buttons">
            <Link
              to={`/tickets/view/${row.original._id}`}
              className="text-[12px] px-1"
            >
              View
            </Link>
            |
            <Link
              to={`/tickets/edit/${row.original._id}`}
              className="text-[12px] px-1"
            >
              Edit
            </Link>
            |
            <button
              // onClick={() => navigate(`/tickets/delete/${row.original._id}`)} // Delete route
              className="text-[12px] px-1"
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
