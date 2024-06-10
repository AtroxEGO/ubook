import { Route, Routes } from "react-router-dom";
import OnlyNotAuthedRoute from "../components/OnlyNotAuthedRoute";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Page404 from "../pages/Page404";
import RegisterPage from "../pages/RegisterPage";
import VerifyPage from "../pages/VerifyPage";
import UpdateServicePage from "../pages/UpdateServicePage";
import CreateServicePage from "../pages/CreateServicePage";
import BookingsPendingApproval from "../pages/BookingsPendingApproval";
import ManageServicesPage from "../pages/ManageServicesPage";
import FavoritePage from "../pages/FavoritePage";
import MyBookingsPage from "../pages/MyBookingsPage";
import BookServicePage from "../pages/BookServicePage";
import LandingPage from "../pages/LandingPage";

export const Router = () => (
  <Routes>
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <LandingPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/service"
      element={
        <ProtectedRoute accountType="user">
          <BookServicePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/myBookings"
      element={
        <ProtectedRoute accountType="user">
          <MyBookingsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/favorite"
      element={
        <ProtectedRoute accountType="user">
          <FavoritePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/services"
      element={
        <ProtectedRoute accountType="business">
          <ManageServicesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/pending"
      element={
        <ProtectedRoute accountType="business">
          <BookingsPendingApproval />
        </ProtectedRoute>
      }
    />
    <Route
      path="/createService"
      element={
        <ProtectedRoute accountType="business">
          <CreateServicePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/updateService"
      element={
        <ProtectedRoute accountType="business">
          <UpdateServicePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/verify"
      element={
        <OnlyNotAuthedRoute verify>
          <VerifyPage />
        </OnlyNotAuthedRoute>
      }
    />
    <Route
      path="/login"
      element={
        <OnlyNotAuthedRoute>
          <LoginPage />
        </OnlyNotAuthedRoute>
      }
    />
    <Route
      path="/register"
      element={
        <OnlyNotAuthedRoute>
          <RegisterPage />
        </OnlyNotAuthedRoute>
      }
    />
    <Route
      path="*"
      element={<Page404 />}
    />
  </Routes>
);

export default Router;
