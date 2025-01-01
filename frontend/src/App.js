import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Ticket from "./pages/Tickets/Ticket";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoadAction } from "./actions/authActions";
import store from "./app/Store";
import Dashboard from "./pages/admin/Dashboard";
import TicketAdd from "./pages/Tickets/TicketAdd";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TicketEdit from "./pages/Tickets/TicketEdit";
import TicketView from "./pages/Tickets/TicketView";
import Loader from "./components/loader/Loader";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import ServicesPage from "./pages/admin/ServicesPage";
import TicketStatusesPage from "./pages/admin/TicketStatusesPage";
import TicketSeverityPage from "./pages/admin/TicketSeverityPage";
import TicketPriorityPage from "./pages/admin/TicketPriorityPage";
import UserTicketPage from "./pages/users/UserTicketPage";
import UserDashboardPage from "./pages/users/UserDashboardPage";
import Navbar from "./components/Navbar/Navbar";
import UserAddTicketPage from "./pages/users/UserAddTicketPage";
import ProjectsPage from "./pages/admin/projects/ProjectsPage";
import AddProjectsPage from "./pages/admin/projects/AddProjectsPage";
import UserProjectsPage from "./pages/users/UserProjectsPage";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAuth = async () => {
      await store.dispatch(LoadAction());
      setAuthChecked(true);
    };

    loadAuth();
  }, [dispatch]);

  if (!authChecked) {
    return <Loader />;
  }

  const adminRoutes = [
    { path: "/admin/dashboard", element: <Dashboard /> },
    { path: "/admin/tickets", element: <Ticket /> },
    { path: "/admin/projects", element: <ProjectsPage /> },
    { path: "/admin/projects/add", element: <AddProjectsPage /> },
    { path: "/admin/tickets/add", element: <TicketAdd /> },
    { path: "/admin/tickets/edit/:id", element: <TicketEdit /> },
    { path: "/admin/tickets/view/:id", element: <TicketView /> },
    { path: "/admin/tickets/departments", element: <DepartmentsPage /> },
    { path: "/admin/tickets/services", element: <ServicesPage /> },
    { path: "/admin/tickets/severity", element: <TicketSeverityPage /> },
    { path: "/admin/tickets/priorities", element: <TicketPriorityPage /> },
    { path: "/admin/tickets/statuses", element: <TicketStatusesPage /> },
    { path: "/admin/staff", element: <RegisterPage /> },
  ];

  const userRoutes = [
    { path: "/dashboard", element: <UserDashboardPage /> },
    { path: "/clients/projects", element: <UserProjectsPage /> },
    { path: "/clients/tickets", element: <UserTicketPage /> },
    { path: "/clients/open_ticket", element: <UserAddTicketPage /> },
  ];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {isAuthenticated ? (
        user?.role === "admin" || user?.role === "manager" ? (
          <SideBar>
            <Routes>
              {adminRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path="*" element={<div>Admin Page Not Found</div>} />
            </Routes>
          </SideBar>
        ) : (
          <>
            <Navbar />
            <Routes>
              {userRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path="*" element={<div>User Page Not Found</div>} />
            </Routes>
          </>
        )
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
