import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  DeleteDepartmentAction,
  EditDepartmentAction,
  GetDepartmentsAction,
} from "../../../actions/departmentAction";
import { toast } from "react-toastify";
import ColumnFilter from "../ColumnsFilter";
import DepartmentDialog from "../../Dialogs/DepartmentsDialog";

export const COL_DEPARTMENTS = ({ setInitialData, setIsEdit }) => [
  { Header: "# ID", accessor: "id", Filter: ColumnFilter },
  { Header: "Name", accessor: "name", Filter: ColumnFilter },
  {
    Header: "Department Email",
    accessor: "department_email",
    Filter: ColumnFilter,
  },
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
          "Are you sure you want to delete this department?"
        );
        if (confirmed) {
          try {
            await dispatch(DeleteDepartmentAction(id)).unwrap();
            toast.success("Department deleted successfully!");
          } catch (error) {
            toast.error(error || "Delete failed. Please try again.");
          }
        } else {
          toast.info("Action canceled.");
        }
      };

      const handleEdit = (department) => {
        setInitialData(department);
        setIsEdit(true);
        setOpen(true);
      };
      const handleSubmit = async (data) => {
        try {
          await dispatch(
            EditDepartmentAction({ id: data._id, updatedData: data })
          ).unwrap();
          await dispatch(GetDepartmentsAction());
          toast.success("Department updated successfully!");
          handleClose();
        } catch (error) {
          toast.error(error || "Failed to update department.");
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
            <DepartmentDialog
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
