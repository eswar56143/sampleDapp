import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NoGuard = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state?.userPersistReducer?.isLoggedIn);

  return (
    !isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
  ));
};

export default NoGuard;
