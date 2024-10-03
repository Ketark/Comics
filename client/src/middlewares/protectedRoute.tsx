import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRoutePropsType } from "../types";

export const ProtectedRoute = ({
  user,
  setActive,
}: ProtectedRoutePropsType) => {
  if (!user) {
    setActive(true);
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};
