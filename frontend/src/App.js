import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import Ticket from "./pages/Ticket";

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <SideBar>
        <Routes>
          <Route path="/ticket" element={<Ticket />} />
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} />

          <Route path="*" element={<> not found</>} /> */}
        </Routes>
      </SideBar>
    </>
  );
}

export default App;
