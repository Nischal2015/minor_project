import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let user = useSelector((state) => state.auth.user);
  let location = useLocation();

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} replace={true} />;
  }
  return children;
};

export default RequireAuth;
