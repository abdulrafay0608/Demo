import {
  AiFillHeart,
  AiFillFileText,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { BiCog, BiAnalyse, BiCartAlt } from "react-icons/bi";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaHome, FaTicketAlt } from "react-icons/fa";

export const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />, // Home icon for Dashboard
    roles: ["admin", "manager", "user"],
  },
  {
    path: "/tickets",
    name: "Ticket",
    icon: <FaTicketAlt />, // Ticket icon for Tickets
    roles: ["admin", "manager", "user"],
  },
  {
    path: "/registeration",
    name: "Register",
    icon: <AiOutlineUsergroupAdd />, // Group icon for Registration (admin only)
    roles: ["admin"],
  },
  {
    path: "/sales",
    name: "Sales",
    icon: <MdMessage />, // Message icon for Sales
    roles: ["admin", "manager"],
    subRoutes: [
      {
        path: "/sales/proposals",
        name: "Proposals",
        roles: ["admin", "manager"],
      },
      {
        path: "/sales/invoices",
        name: "Invoices",
        roles: ["admin", "manager"],
      },
      {
        path: "/sales/items",
        name: "Items",
        roles: ["admin"],
      },
    ],
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: <BiAnalyse />, // Analyse icon for Subscriptions
    roles: ["admin", "manager"],
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <BiCartAlt />, // Cart icon for Expenses
    roles: ["admin", "manager"],
  },
  {
    path: "/contracts",
    name: "Contracts",
    icon: <AiFillFileText />, // File icon for Contracts (admin only)
    roles: ["admin"],
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <BiCog />, // Cog icon for Projects
    roles: ["admin", "manager"],
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: <AiFillHeart />, // Heart icon for Tasks (admin, manager, and user)
    roles: ["admin", "manager", "user"],
  },
  {
    path: "/support",
    name: "Support",
    icon: <BsFillShieldLockFill />, // Shield icon for Support
    roles: ["admin", "user"],
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <AiFillFileText />, // File icon for Reports
    roles: ["admin", "manager"],
  },
];
