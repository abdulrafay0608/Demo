import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Ticket from "./pages/Ticket";
import LoginPage from "./pages/LoginPage";
import { Dashboard } from "@mui/icons-material";
import { useState } from "react";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Mock login handler
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };
  return (
    <>
      <>
        {!isAuthenticated ? (
          <Routes>
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        ) : (
          <SideBar>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ticket" element={<Ticket />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </SideBar>
        )}
      </>
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
