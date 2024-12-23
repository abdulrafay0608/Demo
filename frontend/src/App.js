import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Ticket from "./pages/Ticket";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoadAction } from "./actions/authActions";
import store from "./app/Store";
import Dashboard from "./pages/Dashboard";
import TicketAdd from "./components/Form/TicketAdd";

// export const appRoutes = [
//   { path: "/ticket", element: <Ticket /> },
//   { path: "/", element: <Dashboard /> },
//   { path: "/messages", element: <Messages /> },
//   { path: "/analytics", element: <Analytics /> },
//   { path: "/file-manager", element: <FileManager /> },
//   { path: "/order", element: <Order /> },
//   { path: "/saved", element: <Saved /> },
//   { path: "/settings", element: <Setting /> },
//   { path: "*", element: <>Not Found</> },
// ];
// {appRoutes.map((route) => (
//   <Route key={route.path} path={route.path} element={route.element} />
// ))}
function App() {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    console.log("isAuthenticated", isAuthenticated);
    store.dispatch(LoadAction());
  }, [dispatch]);

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
      {!loading && (
        <>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          ) : (
            <SideBar>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ticket" element={<Ticket />} />
                <Route path="/ticket/add" element={<TicketAdd />} />
                <Route path="*" element={<div>Not Found</div>} />
              </Routes>
            </SideBar>
          )}
        </>
      )}
    </>
  );
}
{
  /* 
<Route path="/messages" element={<Messages />} />
<Route path="/analytics" element={<Analytics />} />
<Route path="/file-manager" element={<FileManager />} />
<Route path="/order" element={<Order />} />
<Route path="/saved" element={<Saved />} />
<Route path="/settings" element={<Setting />} />*/
}

export default App;
