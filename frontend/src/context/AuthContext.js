import React, { createContext } from "react";

const AuthContext = createContext({});
export default AuthContext;

export const AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
