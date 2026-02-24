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
import { StoreProducts } from "@/features/store/productos/components/StoreProducts";
import { StoreProductsProvider } from "@/features/store/productos/context/StoreProductsProvider";
import { StoreInventory } from "@/features/store/inventario/components/StoreInventory";
import { StoreInventoryProvider } from "@/features/store/inventario/context/StoreInventoryProvider";
import { StoreEntriesProvider } from "@/features/store/entradas/context/StoreEntriesProvider";
import { StorePendEntriesProvider } from "@/features/store/entradas_pendientes/context/StorePendEntriesProvider";
import { LoteProductsProvider } from "@/features/store/lote_productos/context/LoteProductsProvider";
import { StoreIssuesProvider } from "@/features/store/salidas/context/StoreIssuesProvider";
import { StoreEntries } from "@/features/store/entradas/components/StoreEntries";
import { StoreIssues } from "@/features/store/salidas/components/StoreIssues";
import { Employees } from "@/features/human_resources/empleados/components/Employees";
import { EmployeeProvider } from "@/features/human_resources/empleados/context/EmployeeProvider";
import { EvaluacionesMainScreen } from "@/features/human_resources/evaluacion_desempenio/components/EvaluacionesMainScreen";
import { EvaluacionProvider } from "@/features/human_resources/evaluacion_desempenio/context/EvaluacionProvider";
import { LotesVencimientoReport } from "@/features/store/reports/LotesVencimientoReport";
import { ConsumoCalderaMainScreen } from "@/features/produccion/consumo_caldera/components/ConsumoCalderaMainScreen";

export const UserRoutes = () => {
  return (
    <div className="flex">
      <Navbar /> {/* Sidebar que se verá en toda la aplicación */}
      <div className="w-screen min-h-full lg:flex-1">
        <GlobalDataProvider>
          <Routes>
            {/* Ruta inicial (bienvenida) */}

            <Route
              path="/"
              element={
                <BasicTablesProvider>
                  <MainPage />
                </BasicTablesProvider>
              }
            />
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
            {/* Rutas para la sección de almacén */}
            <Route
              path="/store/products"
              element={
                <StorePendEntriesProvider>
                  <StoreInventoryProvider>
                    <StoreEntriesProvider>
                      <StoreProductsProvider>
                        <BasicTablesProvider>
                          <ProtectedRoute
                            allowedRoles={
                              PermissionsSections.almacen.productosAlmacen
                            }
                            element={<StoreProducts />}
                          />
                        </BasicTablesProvider>
                      </StoreProductsProvider>
                    </StoreEntriesProvider>
                  </StoreInventoryProvider>
                </StorePendEntriesProvider>
              }
            />
            <Route
              path="/store/inventory"
              element={
                <StoreIssuesProvider>
                  <LoteProductsProvider>
                    <StorePendEntriesProvider>
                      <StoreInventoryProvider>
                        <BasicTablesProvider>
                          <ProtectedRoute
                            allowedRoles={
                              PermissionsSections.almacen.inventarioAlmacen
                            }
                            element={<StoreInventory />}
                          />
                        </BasicTablesProvider>
                      </StoreInventoryProvider>
                    </StorePendEntriesProvider>
                  </LoteProductsProvider>
                </StoreIssuesProvider>
              }
            />
            <Route
              path="/store/entries"
              element={
                <StoreEntriesProvider>
                  <StoreIssuesProvider>
                    <LoteProductsProvider>
                      <StorePendEntriesProvider>
                        <StoreInventoryProvider>
                          <BasicTablesProvider>
                            <ProtectedRoute
                              allowedRoles={
                                PermissionsSections.almacen.entradas
                              }
                              element={<StoreEntries />}
                            />
                          </BasicTablesProvider>
                        </StoreInventoryProvider>
                      </StorePendEntriesProvider>
                    </LoteProductsProvider>
                  </StoreIssuesProvider>
                </StoreEntriesProvider>
              }
            />
            <Route
              path="/store/issues"
              element={
                <StoreEntriesProvider>
                  <StoreIssuesProvider>
                    <LoteProductsProvider>
                      <StorePendEntriesProvider>
                        <StoreInventoryProvider>
                          <BasicTablesProvider>
                            <ProtectedRoute
                              allowedRoles={PermissionsSections.almacen.salidas}
                              element={<StoreIssues />}
                            />
                          </BasicTablesProvider>
                        </StoreInventoryProvider>
                      </StorePendEntriesProvider>
                    </LoteProductsProvider>
                  </StoreIssuesProvider>
                </StoreEntriesProvider>
              }
            />
            {/* Rutas para los informes de almacen */}
            <Route
              path="/store/informes/lotes-vencimiento"
              element={
                <ProtectedRoute
                  allowedRoles={
                    PermissionsSections.almacen.informes.vencimientoLotes
                  }
                  element={<LotesVencimientoReport />}
                />
              }
            />
            {/* RUTAS PARA GESTIÓN HUMANA */}
            {/* Ruta para los empleados */}
            <Route
              path="/gh/employees"
              element={
                <EmployeeProvider>
                  <BasicTablesProvider>
                    <ProtectedRoute
                      allowedRoles={
                        PermissionsSections.gestion_humana.empleados
                      }
                      element={<Employees />}
                    />
                  </BasicTablesProvider>
                </EmployeeProvider>
              }
            />
            <Route
              path="/gh/perf-evaluation"
              element={
                <EmployeeProvider>
                  <EvaluacionProvider>
                    <ProtectedRoute
                      allowedRoles={
                        PermissionsSections.gestion_humana
                          .evaluaciones_desempenio
                      }
                      element={<EvaluacionesMainScreen />}
                    />
                  </EvaluacionProvider>
                </EmployeeProvider>
              }
            />
            {/* RUTAS PARA PRODUCCIÓN */}
            {/* Ruta para el consumo de la caldera */}
            <Route
              path="/produccion/consumo-caldera"
              element={
                <EmployeeProvider>
                  <BasicTablesProvider>
                    <ProtectedRoute
                      allowedRoles={
                        PermissionsSections.produccion.consumo_caldera
                      }
                      element={<ConsumoCalderaMainScreen />}
                    />
                  </BasicTablesProvider>
                </EmployeeProvider>
              }
            />
          </Routes>
        </GlobalDataProvider>
      </div>
    </div>
  );
};
