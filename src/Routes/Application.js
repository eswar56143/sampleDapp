import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from "./Guards/AuthGuard";
import NoGuard from "./Guards/NoGuard";
import Home from "../pages/private/home/index";
import Login from "../pages/public/login";
import Register from "../pages/public/register";

const Application = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<NoGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default Application;
