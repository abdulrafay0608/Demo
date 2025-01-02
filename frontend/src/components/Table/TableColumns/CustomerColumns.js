import moment from "moment";
import ColumnFilter from "../ColumnsFilter";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StatusSwitch } from "../StatusToggler";
import { HiMiniViewfinderCircle } from "react-icons/hi2";

export const COL_CUSTOMERS = [
  { Header: "# ID", accessor: "id", Filter: ColumnFilter },
  {
    Header: "Customer Name",
    accessor: "customer_name",
    Filter: ColumnFilter,
    Cell: ({ value }) => <span className="text-nowrap">{value}</span>,
  },
  { Header: "Email", accessor: "user_id.email", Filter: ColumnFilter },
  { Header: "Website", accessor: "website", Filter: ColumnFilter },
  {
    Header: "Active",
    accessor: "status",
    Filter: ColumnFilter,
    Cell: ({ value, row }) => (
      <div className="text-center">
        <StatusSwitch initialStatus={value} id={row?.original?._id} />
      </div>
    ),
  },
  {
    Header: "Created",
    accessor: "createdAt",
    Filter: ColumnFilter,
    Cell: ({ value }) => (
      <>
        {moment(value).format("YYYY-MM-DD")}
        <br />
        {moment(value).format("HH:mm:ss")}
      </>
    ),
  },
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
            <HiMiniViewfinderCircle />
          </button>
        </div>
      );
    },
  },
];
