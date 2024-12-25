import { NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/tickets",
    name: "Ticket",
    icon: <FaUser />,
  },
  {
    path: "/registeration",
    name: "Register",
    icon: <AiFillHeart />,
  },
  {
    path: "/sales",
    name: "Sales",
    icon: <MdMessage />,
    subRoutes: [
      {
        path: "/sales/proposals",
        name: "Proposals ",
      },
      {
        path: "/sales/invoices",
        name: "Invoices",
      },
      {
        path: "/sales/estimates",
        name: "Estimates",
      },
      {
        path: "/sales/payments",
        name: "Payments",
      },
      {
        path: "/sales/credit-notes",
        name: "Credit Notes",
      },
      {
        path: "/sales/items",
        name: "Items",
      },
    ],
  },
  {
    path: "/subscriptions",
    name: "Subscriptions",
    icon: <BiAnalyse />,
  },
  {
    path: "/expenses",
    name: "Expenses",
    icon: <BsCartCheck />,
  },
  {
    path: "/contracts",
    name: "Contracts",
    icon: <AiTwotoneFileExclamation />,
  },
  {
    path: "/projects",
    name: "Projects",
    icon: <BiCog />,
  },
  {
    path: "/tasks",
    name: "Tasks",
    icon: <AiFillHeart />,
  },
  {
    path: "/support",
    name: "Support",
    icon: <AiFillHeart />,
  },
  {
    path: "/reports",
    name: "Reports",
    icon: <AiFillHeart />,
  },
];

const SideBar = ({ children }) => {
  const { user, error, isAuthenticated } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <Navbar toggle={toggle} />
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "50px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 20,
            },
          }}
          className={`sidebar flex-shrink-0`}
        >
          <div className="flex top_section ">
            {/* <img
            border-1 border-gray-700 rounded-lg
              src="https://perfexcrm.com/demo/uploads/staff_profile_images/1/small_1.png"
              alt=""
              className="size-10 rounded-full"
            />
            <div className="text-center m-0 p-0">
              <p className="m-0 p-0">{user?.username}</p>
              <p className="text-[12px] m-0 p-0">{user?.email}</p>
            </div> */}
          </div>
          <section className="routes">
            {routes.map((route) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={route.name}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={route.name}
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  } // Conditionally add the 'active' class if the route is active
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main
          className="main-content"
          style={{
            width: isOpen ? `calc(100% - 220px)` : `100%`,
            transition: "width 0.5s ease",
            overflowX: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
