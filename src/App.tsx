/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";

import { LoginPage } from "./features/auth/components/LoginPage";
import { useAuthStore } from "./shared/store/authStore";
import { useEffect } from "react";
import { APP_MAINTENANCE } from "./config/apiConfig";
import { MaintenancePageT } from "./shared/components/MaintenancePageT";

export const App = () => {
  const { isAuthenticated, checkToken } = useAuthStore();

  useEffect(() => {
    checkToken();
  }, []);

  // MAINTENANCE MODE
  if (APP_MAINTENANCE) {
    return <MaintenancePageT />;
  }

  return (
    <>
      {/* Validación de la ruta a la que va llevar la app cuando inicie */}
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<UserRoutes />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};
