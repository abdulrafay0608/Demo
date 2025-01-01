import moment from "moment";
import ColumnFilter from "../ColumnsFilter";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
const MemberCell = ({ row }) => {
  const members = row.original.member || [];
  const MAX_DISPLAY = 4;
  const remainingCount = members.length - MAX_DISPLAY;

  return (
    <div className="flex items-center">
      <div className="flex -space-x-3">
        {members.slice(0, MAX_DISPLAY).map((member, index) => (
          <div
            key={member._id}
            className="relative group"
            style={{ zIndex: MAX_DISPLAY + index }}
          >
            <img
              src="/asset/avatar.jpg"
              alt={member.value.username}
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            {/* Tooltip */}
            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 -translate-x-1/2 left-1/2 -top-8 whitespace-nowrap">
              {member.value.username}
              {/* Triangle pointer */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
            </div>
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600 relative"
            style={{ zIndex: 0 }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    </div>
  );
};
export const COL_PROJECTS = [
  { Header: "# ID", accessor: "id", Filter: ColumnFilter },
  {
    Header: "Project Name",
    accessor: "project_name",
    Filter: ColumnFilter,
    Cell: ({ value }) => <span className="text-nowrap">{value}</span>,
  },
  { Header: "Customer", accessor: "customer.username", Filter: ColumnFilter },
  {
    Header: "Start Date",
    accessor: "start_date",
    Filter: ColumnFilter,
    Cell: ({ value }) => moment(value).format("YYYY-MM-DD"),
  },
  {
    Header: "Deadline",
    accessor: "deadline",
    Filter: ColumnFilter,
    Cell: ({ value }) => moment(value).format("YYYY-MM-DD"),
  },
  {
    Header: "Members",
    accessor: "members",
    Cell: MemberCell,
    Filter: ColumnFilter,
  },
  { Header: "Status", accessor: "status.name", Filter: ColumnFilter },
  {
    Header: "Options",
    accessor: "options",
    disableFilters: true,
    Cell: ({ row }) => {
      //   const [open, setOpen] = useState(false);
      //   const handleClose = () => setOpen(false);
      // const dispatch = useDispatch();

      //   const handleDelete = async (id) => {
      //     const confirmed = window.confirm(
      //       "Are you sure you want to delete this service?"
      //     );
      //     if (confirmed) {
      //       try {
      //         await dispatch(DeleteServiceAction(id)).unwrap();
      //         toast.success("service deleted successfully!");
      //       } catch (error) {
      //         toast.error(error || "Delete failed. Please try again.");
      //       }
      //     } else {
      //       toast.info("Action canceled.");
      //     }
      //   };

      //   const handleEdit = (service) => {
      //     setInitialData(service);
      //     setIsEdit(true);
      //     setOpen(true);
      //   };
      //   const handleSubmit = async (data) => {
      //     try {
      //       await dispatch(
      //         EditServiceAction({ id: data._id, updatedData: data })
      //       ).unwrap();
      //       await dispatch(GetServicesAction());
      //       toast.success("Service updated successfully!");
      //       handleClose();
      //     } catch (error) {
      //       toast.error(error || "Failed to update service.");
      //     }
      //   };
      return (
        <div className="flex items-center">
          <button
            // onClick={() => handleEdit(row.original)}
            className="text-base p-1.5 hover:bg-slate-200 rounded-full cursor-pointer"
          >
            <FiEdit />
          </button>
          {/* {open && (
            <ServiceDialog
              isEdit={true}
              open={open}
              initialData={row.original}
              handleClose={handleClose}
              onSubmit={handleSubmit}
            />
          )} */}
          <button
            // onClick={() => handleDelete(row.original._id)}
            className="text-base p-1.5 hover:bg-slate-200 rounded-full cursor-pointer"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      );
    },
  },
];
