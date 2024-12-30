import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { routes } from "../Routes/SideBarRoutes";
import { IoMdSettings } from "react-icons/io";
import SetupSideBar from "./SetupSideBar";

const SideBar = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const accessibleRoutes = routes.filter((route) => {
    if (isAuthenticated && route.roles.includes(user?.role)) {
      return true;
    }
    return false;
  });
  const [isOpen, setIsOpen] = useState(true);
  const [isSetupOpen, setIsSetupOpen] = useState(false); // Setup sidebar state
  const toggle = () => setIsOpen(!isOpen);
  const toggleSetupSidebar = () => setIsSetupOpen(!isSetupOpen);

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
            {accessibleRoutes.map((route) => {
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
                  }
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
            {user.role === "admin" && (
              <button onClick={toggleSetupSidebar} className={"link"}>
                <div className="icon">{<IoMdSettings />}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Administration
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            )}
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
          <SetupSideBar
            isSetupOpen={isSetupOpen}
            setIsSetupOpen={setIsSetupOpen}
            toggleSetupSidebar={toggleSetupSidebar}
          />
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
