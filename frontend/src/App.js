import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider, CssBaseline } from "@mui/material";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useMode } from "./theme";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import EditAssignedTask from "./pages/EditAssignedTask";
import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import Profile from "./pages/Profile";

function App() {
  const currentTheme = useSelector((state) => state.colorMode.mode);

  return (
    <>
      <ThemeProvider theme={useMode(currentTheme)}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <Sidebar />
            <div className="app_rightside">
              <Header />
              <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-task" element={<AddTask />} />
                <Route path="/task/:id" element={<EditTask />} />
                <Route
                  path="/assigned-task/:id"
                  element={<EditAssignedTask />}
                />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
