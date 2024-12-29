// In DepartmentColumns.js
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ColumnFilter from "./ColumnsFilter";
import TicketStatusesDialog from "../../Dialogs/TicketStatusesDialog";
import { DeleteTicketStatusesAction, EditTicketStatusesAction, GetTicketStatusesAction } from "../../../actions/ticketStatusesAction";

export const COL_TICKET_STATUSES = ({ setInitialData, setIsEdit }) => [
  { Header: "# ID", accessor: "_id", Filter: ColumnFilter },
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
          "Are you sure you want to delete this ticket status?"
        );
        if (confirmed) {
          try {
            await dispatch(DeleteTicketStatusesAction(id)).unwrap();
            toast.success("ticket status deleted successfully!");
          } catch (error) {
            toast.error(error || "Delete failed. Please try again.");
          }
        } else {
          toast.info("Action canceled.");
        }
      };

      const handleEdit = (ticketstatus) => {
        setInitialData(ticketstatus);
        setIsEdit(true);
        setOpen(true);
      };
      const handleSubmit = async (data) => {
        try {
          await dispatch(
            EditTicketStatusesAction({ id: data._id, updatedData: data })
          ).unwrap();
          await dispatch(GetTicketStatusesAction());
          toast.success("Ticket status updated successfully!");
          handleClose();
        } catch (error) {
          toast.error("Failed to update ticket status.");
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
            <TicketStatusesDialog
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
