import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Ticket from "./pages/Tickets/Ticket";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoadAction } from "./actions/authActions";
import store from "./app/Store";
import Dashboard from "./pages/Dashboard";
import TicketAdd from "./pages/Tickets/TicketAdd";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Loader from "./components/loader/Loader";
import TicketEdit from "./pages/Tickets/TicketEdit";
import TicketView from "./pages/Tickets/TicketView";

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
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isAuthenticated ? (
        <SideBar>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<Ticket />} />
            <Route path="/registeration" element={<RegisterPage />} />
            <Route path="/tickets/add" element={<TicketAdd />} />
            <Route path="/tickets/edit/*" element={<TicketEdit />} />
            <Route path="/tickets/view/*" element={<TicketView />} />
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
