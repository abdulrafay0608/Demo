import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { setupRoutes } from "../Routes/SideBarRoutes";
import { IoMdClose, IoMdSettings } from "react-icons/io";

const SetupSideBar = ({ isSetupOpen, setIsSetupOpen, toggleSetupSidebar }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const accessibleRoutes = setupRoutes.filter((route) => {
    if (isAuthenticated && route.roles.includes(user?.role)) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 650) {
        setIsSetupOpen(false);
      } else {
        setIsSetupOpen(false);
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
      <div className="absolute z-40 left-0 bg-[#f4f4f5] border-r border-[#808080] min-h-full">
        <motion.div
          animate={{
            width: isSetupOpen ? "220px" : "0px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 20,
            },
          }}
          className={`flex-shrink-0`}
        >
          <div
            className={`flex justify-between items-center px-4 py-2 w-full text-base font-semibold ${
              isSetupOpen ? "justify-between" : "justify-center"
            }`}
            onClick={toggleSetupSidebar}
          >
            {/* Show "Setup" only when the sidebar is closed */}
            {isSetupOpen && <p className="text-center">Administration</p>}

            {/* Show close icon only when the sidebar is open */}
            {isSetupOpen && <IoMdClose className="text-lg cursor-pointer" />}
          </div>
          {isSetupOpen && (
            <section className="text-sm flex justify-center flex-col">
              {accessibleRoutes.map((route) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      key={route.name}
                      setIsOpen={setIsSetupOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isSetupOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    className={({ isActive }) =>
                      isActive ? "link active" : "link"
                    }
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isSetupOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="text-sm whitespace-nowrap"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          )}
        </motion.div>

        {/* <main
          className="main-content"
          style={{
            width: isOpen ? `calc(100% - 220px)` : `100%`,
            transition: "width 0.5s ease",
            overflowX: "auto",
          }}
        >
          {children}
        </main> */}
      </div>
    </>
  );
};

export default SetupSideBar;
