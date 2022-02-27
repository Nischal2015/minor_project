import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  let authenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(authenticated);
  let location = useLocation();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace={true} />;
  }
  return children;
};

export default RequireAuth;
