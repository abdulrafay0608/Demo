import "./App.css";
import { Route, Routes } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Ticket from "./pages/Tickets/Ticket";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoadAction } from "./actions/authActions";
import store from "./app/Store";
import Dashboard from "./pages/Dashboard";
import TicketAdd from "./pages/Tickets/TicketAdd";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TicketEdit from "./pages/Tickets/TicketEdit";
import TicketView from "./pages/Tickets/TicketView";
import Loader from "./components/loader/Loader";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import ServicesPage from "./pages/admin/ServicesPage";
import StatusesPage from "./pages/admin/StatusesPage";

function App() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false); // Ensure auth is checked before actions
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
        <SideBar>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/tickets/add" element={<TicketAdd />} />
            <Route path="/tickets/edit/:id" element={<TicketEdit />} />
            <Route path="/tickets/view/:id" element={<TicketView />} />
            <Route
              path="/admin/tickets/departments"
              element={<DepartmentsPage />}
            />
            <Route path="/admin/tickets/services" element={<ServicesPage />} />
            <Route path="/admin/tickets/statuses" element={<StatusesPage />} />
            <Route path="/admin/staff" element={<RegisterPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </SideBar>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
