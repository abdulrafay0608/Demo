import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineSearch,
} from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { COL_DEPARTMENTS } from "../../components/Table/TableColumns/DepartmentColumns";
import {
  AddDepartmentAction,
  GetDepartmentsAction,
} from "../../actions/departmentAction";
import DepartmentDialog from "../../components/Dialogs/DepartmentsDialog";

const DepartmentsPage = () => {
  const [initialData, setInitialData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state?.user);
  const { department, loading } = useSelector((state) => state?.department);
  const columns = useMemo(
    () =>
      COL_DEPARTMENTS({
        setInitialData,
        setIsEdit,
      }),
    [COL_DEPARTMENTS]
  );
  const data = useMemo(
    () => (Array.isArray(department) ? department : []),
    [department]
  );
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setIsEdit(false);
    setOpen(true);
    setInitialData(null); // For new department
  };

  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
    setInitialData(null);
  };

  const handleSubmit = (data) => {
    dispatch(AddDepartmentAction(data))
      .unwrap()
      .then(() => {
        toast.success("Department added successfully!");
        handleClose();
      })
      .catch((err) => {
        toast.error(err || "Department failed. Please try again.");
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(GetDepartmentsAction());
    }
  }, [isAuthenticated, dispatch]);

  const {
    getTableProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
    canPreviousPage,
    canNextPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { key: tableKey, ...tableProps } = getTableProps();

  if (loading) return <Loader />;

  return (
    <>
      {open && (
        <DepartmentDialog
          isEdit={isEdit}
          initialData={initialData}
          handleClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
      <div className="w-full p-3">
        <div>
          <div className="flex m-3 text-sm space-x-2">
            <button
              className="text-sm bg-black text-white py-2 px-3 rounded-md font-inherit hover:bg-opacity-90"
              onClick={handleClickOpen}
            >
              <span className="flex items-center gap-1.5">
                <FiPlus />
                New Department
              </span>
            </button>
          </div>
          <div className="text-sm bg-white border flex flex-col justify-between  max-w-screen-2xl rounded-lg m-3  overflow-x-auto">
            <div className="flex justify-between items-center m-4">
              <div>
                <select
                  className="text-sm bg-transparent outline-none border border-gray-400 rounded-md px-2 pr-6 py-1"
                  value={pageSize === rows.length ? "All" : pageSize}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPageSize(value === "All" ? rows.length : Number(value));
                    setGlobalFilter("");
                  }}
                >
                  {[10, 25, 50, 100, "All"].map((pageSizeOption) => (
                    <option key={pageSizeOption} value={pageSizeOption}>
                      {pageSizeOption}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="border-2 border-gray-300 rounded-md flex justify-between items-center">
                  <label className="px-3">
                    <MdOutlineSearch className="text-2xl" />
                  </label>
                  <input
                    className="p-2 border-l-2 border-gray-300 outline-gray-500 w-full"
                    type="text"
                    placeholder="Search..."
                    value={globalFilter || ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <table
              className="min-w-full border-collapse border border-gray-200"
              style={{ tableLayout: "auto" }}
              key={tableKey}
              {...tableProps}
            >
              <thead className="bg-gray-100 overflow-x-auto">
                {headerGroups.map((headerGroup) => {
                  const { key: headerGroupKey, ...headerGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={headerGroupKey} {...headerGroupProps}>
                      {headerGroup.headers.map((column) => {
                        // Separate sorting props and header props
                        const sortProps = column.getSortByToggleProps();
                        const { key: sortKey, ...restSortProps } = sortProps;
                        return (
                          <th
                            key={column.id}
                            {...restSortProps}
                            className="px-2 py-2 font-semibold text-nowrap text-left cursor-pointer border"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <div className="flex justify-between items-center space-x-1">
                              <span>{column.render("Header")}</span>{" "}
                              <span>
                                {column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <MdKeyboardArrowDown className="text-xl bg-gray-300 p-0.5 rounded-lg" />
                                  ) : (
                                    <MdKeyboardArrowUp className="text-xl bg-gray-300 p-0.5 rounded-lg" />
                                  )
                                ) : (
                                  <MdKeyboardArrowDown className="invisible group-hover:visible text-xl hover:bg-gray-300 p-0.5 rounded-lg" />
                                )}
                              </span>
                            </div>
                            {column.canFilter ? (
                              <div
                                className="font-normal"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {column.render("Filter")}
                              </div>
                            ) : null}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {page.map((row) => {
                  prepareRow(row);
                  const { key, ...rowProps } = row.getRowProps();
                  return (
                    <tr key={key} {...rowProps}>
                      {row.cells.map((cell) => {
                        const { key: cellKey, ...cellProps } =
                          cell.getCellProps();
                        return (
                          <td
                            key={cell.row.id + cell.column.id}
                            className="px-2 py-3 text-sm text-gray-700"
                            style={{
                              whiteSpace: "nowrap", // Prevent wrapping
                              textOverflow: "ellipsis", // Add ellipsis for overflow
                              overflow: "hidden", // Ensure text does not overflow
                            }}
                            {...cellProps}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center flex-nowrap p-4">
              <div className="text-nowrap">
                <span className="text-sm text-gray-700 font-questrial font-normal">
                  Showing{" "}
                  <span className="font-medium">
                    {rows.length > 0 ? pageIndex * pageSize + 1 : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min((pageIndex + 1) * pageSize, rows.length)}
                  </span>{" "}
                  of <span className="font-medium">{rows.length}</span> entries
                </span>
              </div>
              <div className="flex justify-center items-center gap-x-2">
                <button
                  className={`${
                    !canPreviousPage &&
                    "cursor-not-allowed text-gray-300 bg-white hover:bg-gray-50 "
                  } relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  First
                </button>
                <button
                  className={`${
                    !canNextPage &&
                    "cursor-not-allowed text-gray-300 bg-white hover:bg-gray-50 "
                  } relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  Last
                </button>
                <button
                  className={`${
                    !canPreviousPage &&
                    "cursor-not-allowed text-gray-300 bg-white hover:bg-gray-50 "
                  } relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <div className="text-nowrap">
                  <span className="font-medium">
                    {rows.length > 0 ? pageIndex * pageSize + 1 : 0}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min((pageIndex + 1) * pageSize, rows.length)}
                  </span>
                </div>
                <button
                  className={`${
                    !canNextPage &&
                    "cursor-not-allowed text-gray-300 bg-white hover:bg-gray-50 "
                  } relative inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50`}
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentsPage;