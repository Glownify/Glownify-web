import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./redux/store";
import LoginPage from "./pages/Common/LoginPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import DashboardLayout from "./components/layout/DashboardLayout";

// Super Admin Pages
import SuperAdminDashboard from "./pages/SuperAdmin/SuperAdminDashboard";
import ManageSaloonsPage from "./pages/SuperAdmin/ManageSaloonsPage";
import ManageUsersPage from "./pages/SuperAdmin/ManageUsersPage";
import ManageCitiesAndStatesPage from "./pages/SuperAdmin/ManageCitiesAndStatesPage";
import ManageCategoriesPage from "./pages/SuperAdmin/ManageCategoriesPage";
import ManageSalesExecutivePage from "./pages/SuperAdmin/ManageSalesExecutivePage";
import ProfilePage from "./pages/SuperAdmin/ProfilePage";

// Sales Executive Pages
import SalesExecitiveDashboard from "./pages/SalesExecutive/SalesExecitiveDashboard";
import ManageSalesmen from "./pages/SalesExecutive/ManageSalesmen";
import UserLayout from "./components/User/UserLayout";
import HomePage from "./pages/User/HomePage";
import ServicesPage from "./pages/User/ServicesPage";
import MyBookingsPage from "./pages/User/MyBookingsPage";
import UserProfilePage from "./pages/User/UserProfilePage";
import SaloonDetailsPage from "./pages/User/SaloonDetailsPage";

const App = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />

          {/* SUPER ADMIN */}
          <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
            <Route path="/super-admin" element={<DashboardLayout />}>
              <Route index element={<SuperAdminDashboard />} />
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="manage-saloons" element={<ManageSaloonsPage />} />
              <Route path="manage-categories" element={<ManageCategoriesPage />} />
              <Route path="manage-users" element={<ManageUsersPage />} />
              <Route
                path="manage-cities-and-states"
                element={<ManageCitiesAndStatesPage />}
              />
              <Route
                path="manage-sales-executives"
                element={<ManageSalesExecutivePage />}
              />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* SALES EXECUTIVE */}
          <Route element={<ProtectedRoute allowedRoles={["sales_executive"]} />}>
            <Route path="/sales-executive" element={<DashboardLayout />}>
              <Route index element={<SalesExecitiveDashboard />} />
              <Route path="dashboard" element={<SalesExecitiveDashboard />} />
              <Route path="manage-salesmen" element={<ManageSalesmen />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* CUSTOMER ROUTE */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route element={<UserLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/saloon/:id" element={<SaloonDetailsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/bookings" element={<MyBookingsPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
