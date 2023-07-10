import React from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "@/models/system";

const useAuth = (): boolean => {
  const currentUser = useStore((state) => state.currentUser);

  return !!currentUser;
};

const Auth = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const auth = useAuth();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Auth;
