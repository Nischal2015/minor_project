import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace={true} />;
  }

  return children;
};

export default RequireAuth;
