import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuard = () => {
  const isLoggedIn = useSelector((state) => state?.userPersistReducer?.isLoggedIn);
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default AuthGuard;
