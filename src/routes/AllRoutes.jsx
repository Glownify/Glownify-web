import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./../redux/store";
import LoginPage from "./../pages/Common/LoginPage";
import ProtectedRoute from "./../components/ProtectedRoutes";
import DashboardLayout from "./../components/layout/DashboardLayout";

// Super Admin Pages
import SuperAdminDashboard from "./../pages/SuperAdmin/SuperAdminDashboard";
import ManageSaloonsPage from "./../pages/SuperAdmin/ManageSaloonsPage";
import ManageUsersPage from "./../pages/SuperAdmin/ManageUsersPage";
import ManageCitiesAndStatesPage from "./../pages/SuperAdmin/ManageCitiesAndStatesPage";
import ManageCategoriesPage from "./../pages/SuperAdmin/ManageCategoriesPage";
import ManageSalesExecutivePage from "./../pages/SuperAdmin/ManageSalesExecutivePage";
import ManageSubscriptionPage from "./../pages/SuperAdmin/ManageSubscriptionPage";
import ManageResetPassword from "./../pages/SuperAdmin/ManageResetPassword";
import SuperAdminProfilePage from "../pages/SuperAdmin/SuperAdminProfilePage";

// Sales Executive Pages
import SalesExecitiveDashboard from "./../pages/SalesExecutive/SalesExecitiveDashboard";
import ManageSalesman from "./../pages/SalesExecutive/ManageSalesman";
import SalesExecutiveProfilePage from "../pages/SalesExecutive/SalesExecutiveProfilePage";

// Saloon Owner Pages
import SaloonOwnerDashboard from "../pages/SaloonOwner/SaloonOwnerDashboard";
import ManageServicesPage from "../pages/SaloonOwner/ManageServicesPage";
import ManageSpecialistsPage from "../pages/SaloonOwner/ManageSpecialistsPage";
import ManageAnalyticsPage from "../pages/SaloonOwner/ManageAnalyticsPage";
import ManageBookingsPage from "../pages/SaloonOwner/ManageBookingsPage";
import AIHairstyleScannerPage from "../pages/SaloonOwner/AIHairstyleScannerPage";
import AIPosterCreatorPage from "../pages/SaloonOwner/AIPosterCreatorPage";
import SaloonOwnerProfilePage from "../pages/SaloonOwner/SaloonOwnerProfilePage";

// Salesman Pages
import SalesmanDashboard from "../pages/Salesman/SalesmanDashboard";
import MySaloonsPage from "../pages/Salesman/MySaloonsPage";
import SalesmanProfilePage from "../pages/Salesman/SalesmanProfilePage";

//TeamLead Pages
import TeamLeadDashboard from "../pages/TeamLead/TeamLeadDashboard";
import TeamLeadProfilePage from "../pages/TeamLead/TeamLeadProfilePage";

//IndependentPro Pages
import IndependentProDashboard from "../pages/IndependentPro/IndependentProDashboard";
import IndependentProProfilePage from "../pages/IndependentPro/IndependentProProfilePage";

//Specialist Pages
import SpecialistDashboard from "../pages/Specialist/SpecialistDashboard";
import SpecialistProfilePage from "../pages/Specialist/SpecialistProfilePage";

// Customer Pages
import UserLayout from "./../components/User/UserLayout";
import HomePage from "./../pages/User/HomePage";
import ServicesPage from "./../pages/User/ServicesPage";
import MyBookingsPage from "./../pages/User/MyBookingsPage";
import UserProfilePage from "./../pages/User/UserProfilePage";
import HomeSaloonsDetails from "../pages/User/HomePageLayout/HomeSaloonsDetails";
import SalonServices from "../pages/User/HomePageLayout/HomeSaloonDetails/SalonServices";
import SalonGallery from "../pages/User/HomePageLayout/HomeSaloonDetails/SalonGallery";
import SalonMap from "../pages/User/HomePageLayout/HomeSaloonDetails/SalonMap";
import SalonReviews from "../pages/User/HomePageLayout/HomeSaloonDetails/SalonReviews";
import SalonSpecialists from "../pages/User/HomePageLayout/HomeSaloonDetails/SalonSpecialists";


const AllRoutes = () => {
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
              <Route
                path="manage-categories"
                element={<ManageCategoriesPage />}
              />
              <Route path="manage-users" element={<ManageUsersPage />} />
              <Route
                path="manage-cities-and-states"
                element={<ManageCitiesAndStatesPage />}
              />
              <Route
                path="manage-sales-executives"
                element={<ManageSalesExecutivePage />}
              />
              <Route path="manage-subscriptions" element={<ManageSubscriptionPage />} />
              <Route
                path="manage-reset-password"
                element={<ManageResetPassword />}
              />
              <Route path="profile" element={<SuperAdminProfilePage />} />
            </Route>
          </Route>

          {/* SALES EXECUTIVE */}
          <Route
            element={<ProtectedRoute allowedRoles={["sales_executive"]} />}
          >
            <Route path="/sales-executive" element={<DashboardLayout />}>
              <Route index element={<SalesExecitiveDashboard />} />
              <Route path="dashboard" element={<SalesExecitiveDashboard />} />
              <Route path="manage-salesman" element={<ManageSalesman />} />
              <Route path="profile" element={<SalesExecutiveProfilePage />} />
            </Route>
          </Route>

          {/* SALOON OWNER */}
          <Route element={<ProtectedRoute allowedRoles={["salon_owner"]} />}>
            <Route path="/saloon-owner" element={<DashboardLayout />}>
              <Route index element={<SaloonOwnerDashboard />} />
              <Route path="dashboard" element={<SaloonOwnerDashboard />} />
              <Route path="manage-services" element={<ManageServicesPage />} />
              <Route path="manage-specialists" element={<ManageSpecialistsPage />} />
              <Route path="manage-analytics" element={<ManageAnalyticsPage />} />
              <Route path="manage-bookings" element={<ManageBookingsPage />} />
              <Route path="ai-poster-creator" element={<AIPosterCreatorPage />} />
              <Route path="ai-hairstyle-scanner" element={<AIHairstyleScannerPage />} />
              <Route path="profile" element={<SaloonOwnerProfilePage />} />
            </Route>
          </Route>

          {/* SALESMAN */}
          <Route element={<ProtectedRoute allowedRoles={["salesman"]} />}>
            <Route path="/salesman" element={<DashboardLayout />}>
              <Route index element={<SalesmanDashboard />} />
              <Route path="dashboard" element={<SalesmanDashboard />} />
              <Route path="my-saloons" element={<MySaloonsPage />} />
              <Route path="profile" element={<SalesmanProfilePage />} />
            </Route>
          </Route>

          {/* TEAM LEAD */}
          <Route element={<ProtectedRoute allowedRoles={["team_lead"]} />}>
            <Route path="/team-lead" element={<DashboardLayout />}>
              <Route index element={<TeamLeadDashboard />} />
              <Route path="dashboard" element={<TeamLeadDashboard />} />
              <Route path="profile" element={<TeamLeadProfilePage />} />
            </Route>
          </Route>

          {/* INDEPENDENT PRO */}
          <Route element={<ProtectedRoute allowedRoles={["independent_pro"]} />}>
            <Route path="/independent-pro" element={<DashboardLayout />}>
              <Route index element={<IndependentProDashboard />} />
              <Route path="dashboard" element={<IndependentProDashboard />} />
              <Route path="profile" element={<IndependentProProfilePage />} />
            </Route>
          </Route>

          {/* SPECIALIST */}
          <Route element={<ProtectedRoute allowedRoles={["specialist"]} />}>
            <Route path="/specialist" element={<DashboardLayout />}>
              <Route index element={<SpecialistDashboard />} />
              <Route path="dashboard" element={<SpecialistDashboard />} />
              <Route path="profile" element={<SpecialistProfilePage />} />
            </Route>
          </Route>

          {/* CUSTOMER ROUTE */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route element={<UserLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/salon/:id" element={<HomeSaloonsDetails />}>
              <Route index element={<Navigate to="services" replace />} />
                <Route path="services" element={<SalonServices />} />
                <Route path="gallery" element={<SalonGallery />} />
                <Route path="map" element={<SalonMap />} />
                <Route path="reviews" element={<SalonReviews />} />
                <Route path="specialists" element={<SalonSpecialists />} />
              </Route>
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

export default AllRoutes;
