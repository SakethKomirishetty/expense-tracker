import React from "react";
import UserDashBoard from "./components/user-dashboard/UserDashBoard.js";
import Budget from "./components/budget-page/Budget.js";
// Bootstrap file
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./components/user-profile/UserProfile.js";
// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
// component imports
import Layout from "./components/Layout.js";
import Login from "./components/user/Login.js";
import Register from "./components/user/Signup.js";
import Dashboard from "./components/dashboard/dashboard";

// css file
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  let { currentUser } = useSelector((state) => state.userLogin);
  const browserRouter = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
    },
    {
      path: "user/register",
      element: <Register />,
    },
    {
      path: "user/login",
      element: <Login />,
    },
    {
      path: "/user-profile",
      element: <UserProfile />,
      children: [
        {
          path: "dashboard/:username",
          element: <UserDashBoard />,
        },
        {
          path: "budget/:username",
          element: <Budget />,
        },
        {
          path: "expenses/:username",
          element: <Dashboard />,
        },
        {
          path: "",
          element: <Navigate to={`dashboard/${currentUser.username}`} />,
        },
      ],
    },
  ]);
  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={<Layout />} />
    //     <Route exact path="/user/login" element={<Login />} />
    //     <Route exact path="/user/register" element={<Register />} />
    //     <Route exact path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </Router>
    <div>
      <RouterProvider router={browserRouter} />
    </div>
  );
};

export default App;
