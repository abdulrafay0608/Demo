import React, { useMemo } from "react";
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
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TicketTable = ({ data }) => {
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      { Header: "Ticket ID", accessor: "ticketId" },
      { Header: "Customer Name", accessor: "customerName" },
      { Header: "Issue Type", accessor: "issueType" },
      { Header: "Subject", accessor: "subject" },
      { Header: "Description", accessor: "description" },
      { Header: "Status", accessor: "status" },
      { Header: "Priority", accessor: "priority" },
      {
        Header: "Created Date",
        accessor: "createdDate",
        Cell: ({ value }) => (
          <>
            {moment(value).format("YYYY-MM-DD")}
            <br />
            {moment(value).format("HH:mm:ss")}
          </>
        ),
      },
      {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({ value }) => (
          <>
            {moment(value).format("YYYY-MM-DD")}
            <br />
            {moment(value).format("HH:mm:ss")}
          </>
        ),
      },
      { Header: "Assigned Agent", accessor: "assignedAgent" },
    ],
    []
  );

  // React Table Hooks
  const {
    getTableProps,
    // getTableBodyProps,
    headerGroups,
    rows, // All rows in the dataset
    page, // Rows for the current page
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
    // pageOptions,
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
  return (
    <div>
      <div className="flex m-3 text-sm space-x-2">
        <button
          className="text-sm bg-black text-white py-1 px-3 rounded-md font-inherit hover:bg-opacity-90"
          onClick={() => navigate("/ticket/add")}
        >
          <span className="flex items-center gap-1.5">
            <FiPlus />
            New Ticket
          </span>
        </button>

        <button
          className="text-sm bg-transparent py-1.5 px-3 rounded-md border border-gray-500 font-inherit text-red-500 hover:bg-red-50"
          onClick={() => setGlobalFilter("open")}
        >
          Open
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-green-500 hover:bg-green-50"
          onClick={() => setGlobalFilter("in progress")}
        >
          In Progress
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-blue-500 hover:bg-blue-50"
          onClick={() => setGlobalFilter("answered")}
        >
          Answered
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-gray-500 hover:bg-gray-50"
          onClick={() => setGlobalFilter("on hold")}
        >
          On Hold
        </button>

        <button
          className="text-sm bg-transparent py-1 px-2 rounded-lg border border-gray-500 font-inherit text-blue-400 hover:bg-blue-50"
          onClick={() => setGlobalFilter("closed")}
        >
          Closed
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
                      >
                        <div className="flex justify-between items-center space-x-1">
                          <span>{column.render("Header")}</span>
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
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {page
              // .filter((row) => {
              //   if (!statusFilter) return true;
              //   return (
              //     row.original.status.toLowerCase() ===
              //     statusFilter.toLowerCase()
              //   );
              // })
              .map((row) => {
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
                          className="px-2 py-1 text-[13px] text-gray-700"
                          {...cellProps}
                        >
                          {cell.column.id === "status" ? (
                            <span
                              className={`px-1.5 py-0.5 rounded-lg text-nowrap ${
                                row.original.status.toLowerCase() === "open"
                                  ? "text-red-500 border"
                                  : row.original.status.toLowerCase() ===
                                    "in progress"
                                  ? "text-green-500 border"
                                  : row.original.status.toLowerCase() ===
                                    "answered"
                                  ? "text-blue-500 border"
                                  : row.original.status.toLowerCase() ===
                                    "on hold"
                                  ? "text-gray-500 border"
                                  : row.original.status.toLowerCase() ===
                                    "closed"
                                  ? "text-[#19ADF4] border"
                                  : ""
                              }`}
                            >
                              {row.original.status}
                            </span>
                          ) : (
                            cell.render("Cell")
                          )}
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
  );
};

export default TicketTable;
