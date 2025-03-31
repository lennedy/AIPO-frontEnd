import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "context/AuthProvider";
import routes from "routes";

const PrivateRoute = () => {
  const dataAuth = useAuth();
  const route = routes[6];
  const token = dataAuth.token;

  if (!token) {
    return (
      <Routes>
        <Route exact path={route.route} element={route.component} key={route.key} />
        <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
      </Routes>
    );
  }
  return <Outlet />;
};

export default PrivateRoute;
