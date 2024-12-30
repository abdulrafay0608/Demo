import {
  AiFillFileText,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { FaHome, FaTicketAlt } from "react-icons/fa";

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />, // Home icon for Dashboard
    roles: ["admin", "manager", "user"],
  },
  {
    path: "/admin/tickets",
    name: "Support",
    icon: <FaTicketAlt />, // Ticket icon for Tickets
    roles: ["admin", "manager", "user"],
  },
  {
    path: "/admin/customers",
    name: "Customers",
    icon: <AiOutlineUsergroupAdd />, // Group icon for Registration (admin only)
    roles: ["admin", "manager", "user"],
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <AiFillFileText />, // File icon for Reports
    roles: ["admin", "manager"],
    subRoutes: [
      {
        path: "/reports/sales",
        name: "Sales",
        roles: ["admin", "manager"],
      },
      {
        path: "/reports/expenses",
        name: "Expenses",
        roles: ["admin", "manager"],
      },
      {
        path: "/reports/expenses-vs-income",
        name: "Expenses vs Income",
        roles: ["admin"],
      },
      {
        path: "/reports/leads",
        name: "Leads",
        roles: ["admin"],
      },
      {
        path: "/reports/timesheets-overview",
        name: "Timesheets overview",
        roles: ["admin"],
      },
    ],
  },
  // {
  //   path: "/setup",
  //   name: "Setup",
  //   icon: <IoMdSettings />, // Message icon for Sales
  //   roles: ["admin"],
  //   subRoutes: [
  //     {
  //       path: "/setup/department",
  //       name: "Department",
  //       roles: ["admin"],
  //     },
  //     {
  //       path: "/setup/designation",
  //       name: "Designation",
  //       roles: ["admin"],
  //     },
  //     {
  //       path: "/setup/services",
  //       name: "Services",
  //       roles: ["admin"],
  //     },
  //     {
  //       path: "/setup/support",
  //       name: "Support",
  //       roles: ["admin"],
  //     },
  //   ],
  // },
];

export const setupRoutes = [
  {
    path: "/admin/staff",
    name: "Staff",
    roles: ["admin"],
  },
  {
    path: "/admin",
    name: "Support",
    roles: ["admin"],
    subRoutes: [
      {
        path: "/admin/tickets/departments",
        name: "Department",
        roles: ["admin"],
      },
      // {
      //   path: "/admin/tickets/designation",
      //   name: "Designation",
      //   roles: ["admin"],
      // },
      {
        path: "/admin/tickets/severity",
        name: "Ticket Severity",
        roles: ["admin"],
      },
      {
        path: "/admin/tickets/priorities",
        name: "Ticket Priority",
        roles: ["admin"],
      },
      {
        path: "/admin/tickets/statuses",
        name: "Ticket Statuses",
        roles: ["admin"],
      },
      {
        path: "/admin/tickets/services",
        name: "Services",
        roles: ["admin"],
      },
    ],
  },
  {
    path: "/roles",
    name: "Role",
    roles: ["admin"],
  },

  //
];
