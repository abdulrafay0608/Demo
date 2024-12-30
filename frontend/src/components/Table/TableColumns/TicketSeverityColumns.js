import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ColumnFilter from "./ColumnsFilter";
import {
  DeleteTicketSeverityAction,
  EditTicketSeverityAction,
  GetTicketSeverityAction,
} from "../../../actions/ticketSeverityAction";
import TicketSeverityDialog from "../../Dialogs/TicketSeverityDialog";

export const COL_TICKET_SEVERITY = ({ setInitialData, setIsEdit }) => [
  { Header: "# ID", accessor: "id", Filter: ColumnFilter },
  { Header: "Name", accessor: "name", Filter: ColumnFilter },
  {
    Header: "Options",
    accessor: "options",
    disableFilters: true,
    Cell: ({ row }) => {
      const [open, setOpen] = useState(false);
      const handleClose = () => setOpen(false);
      const dispatch = useDispatch();
      const handleDelete = async (id) => {
        const confirmed = window.confirm(
          "Are you sure you want to delete this severity?"
        );
        if (confirmed) {
          try {
            await dispatch(DeleteTicketSeverityAction(id)).unwrap();
            toast.success("Severity deleted successfully!");
          } catch (error) {
            toast.error(error || "Delete failed. Please try again.");
          }
        } else {
          toast.info("Action canceled.");
        }
      };

      const handleEdit = (severity) => {
        setInitialData(severity);
        setIsEdit(true);
        setOpen(true);
      };
      const handleSubmit = async (data) => {
        try {
          await dispatch(
            EditTicketSeverityAction({ id: data._id, updatedData: data })
          ).unwrap();
          await dispatch(GetTicketSeverityAction());
          toast.success("Severity updated successfully!");
          handleClose();
        } catch (error) {
          toast.error(error || "Failed to update severity.");
        }
      };
      return (
        <div className="flex items-center">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-base p-1.5 hover:bg-slate-200 rounded-full cursor-pointer"
          >
            <FiEdit />
          </button>
          {open && (
            <TicketSeverityDialog
              isEdit={true}
              open={open}
              initialData={row.original}
              handleClose={handleClose}
              onSubmit={handleSubmit}
            />
          )}
          <button
            onClick={() => handleDelete(row.original._id)}
            className="text-base p-1.5 hover:bg-slate-200 rounded-full cursor-pointer"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      );
    },
  },
];
