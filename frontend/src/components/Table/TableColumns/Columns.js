import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DeleteTicketAction,
  GetTicketAction,
} from "../../../actions/ticketAction";
import { useDispatch, useSelector } from "react-redux";
export const COL_TICKETS = [
  { Header: "# ID", accessor: "_id" },
  {
    Header: "Subject",
    accessor: "subject",
    Cell: ({ value, row }) => {
      const dispatch = useDispatch();
      const { user } = useSelector((state) => state.user);
      const handleDelete = async (id) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this ticket?"
        );
        if (confirmed) {
          try {
            await dispatch(DeleteTicketAction(id)).unwrap();
            toast.success("Ticket deleted successfully!");
            await dispatch(GetTicketAction()); // Reload the tickets
          } catch (error) {
            toast.error(error || "Delete failed. Please try again.");
          }
        } else {
          toast.info("Action canceled.");
        }
      };
      return (
        <div className="main">
          <span>{value}</span>
          <div className="invisible hover:visible subject-buttons">
            <Link
              to={row.original._id ? `/tickets/view/${row.original._id}` : "#"}
              className="text-[12px] px-1"
            >
              View
            </Link>
            {user.role === "admin" && (
              <>
                |
                <Link
                  to={
                    row.original._id ? `/tickets/edit/${row.original._id}` : "#"
                  }
                  className="text-[12px] px-1"
                >
                  Edit
                </Link>
                |
                <button
                  className="text-[12px] px-1"
                  onClick={() => handleDelete(row.original._id)}
                >
                  Delete
                </button>
              </>
            )}
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
