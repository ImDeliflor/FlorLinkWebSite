import { Route, Routes } from "react-router-dom";
import { Navbar } from "../shared/layout/Navbar";
import { MainPage } from "@/features/main";
import { NewOrder } from "@/features/orders";
import { OrderProvider } from "@/features/orders/context/OrderProvider";
import { GlobalDataProvider } from "@/shared/context/GlobalDataProvider";
import { MyOrders } from "@/features/orders/components/MyOrders";
import { ProductProvider } from "@/features/products/context/ProductProvider";
import { BasicTablesProvider } from "@/features/basic_tables/context/BasicTablesProvider";
import { TeamOrders } from "@/features/orders/components/TeamOrders";
import { Orders } from "@/features/orders/components/Orders";
import { Unauthorized } from "@/features/auth/components/Unauthorized";
import { ProtectedRoute } from "./ProtectedRoute";
import { PermissionsSections } from "@/shared/config/permissions";

export const UserRoutes = () => {
  return (
    <div className="flex">
      <Navbar /> {/* Sidebar que se verá en toda la aplicación */}
      <div className="flex-1 min-h-full">
        <GlobalDataProvider>
          <Routes>
            {/* Ruta inicial (bienvenida) */}
            <Route path="/" element={<MainPage />} />

            {/* Ruta en caso de no estar autorizado */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas para la sección de órdenes de compra */}
            <Route
              path="/shopping/new-order"
              element={
                <BasicTablesProvider>
                  <OrderProvider>
                    <ProtectedRoute
                      allowedRoles={PermissionsSections.contabilidad.nuevaOrden}
                      element={<NewOrder />}
                    />
                  </OrderProvider>
                </BasicTablesProvider>
              }
            />
            <Route
              path="/shopping/my-orders"
              element={
                <BasicTablesProvider>
                  <ProductProvider>
                    <OrderProvider>
                      <ProtectedRoute
                        allowedRoles={
                          PermissionsSections.contabilidad.misOrdenes
                        }
                        element={<MyOrders />}
                      />
                    </OrderProvider>
                  </ProductProvider>
                </BasicTablesProvider>
              }
            />
            <Route
              path="/shopping/team-orders"
              element={
                <BasicTablesProvider>
                  <ProductProvider>
                    <OrderProvider>
                      <ProtectedRoute
                        allowedRoles={
                          PermissionsSections.contabilidad.ordenesEquipo
                        }
                        element={<TeamOrders />}
                      />
                    </OrderProvider>
                  </ProductProvider>
                </BasicTablesProvider>
              }
            />
            <Route
              path="/shopping/orders"
              element={
                <BasicTablesProvider>
                  <ProductProvider>
                    <OrderProvider>
                      <ProtectedRoute
                        allowedRoles={PermissionsSections.contabilidad.ordenes}
                        element={<Orders />}
                      />
                    </OrderProvider>
                  </ProductProvider>
                </BasicTablesProvider>
              }
            />
          </Routes>
        </GlobalDataProvider>
      </div>
    </div>
  );
};
