import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import defaultTheme from "./utils/themes";
import { useSelector } from "react-redux";
import { Suspense, lazy, useMemo } from "react";
import OnlyNotAuthedRoute from "./components/OnlyNotAuthedRoute";
import Alerts from "./components/Alerts";
import Notifications from "./components/Notifications";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const accountType = useSelector(
    (state) => state.accountReducer?.accountData?.account
  );

  const theme = useMemo(
    () => defaultTheme(accountType, prefersDarkMode),
    [accountType, prefersDarkMode]
  );

  const LandingPage = lazy(() => import("./pages/LandingPage"));
  const BookServicePage = lazy(() => import("./pages/BookServicePage"));
  const MyBookingsPage = lazy(() => import("./pages/MyBookingsPage"));
  const FavoritePage = lazy(() => import("./pages/FavoritePage"));
  const ManageServicesPage = lazy(() => import("./pages/ManageServicesPage"));
  const BookingsPendingApproval = lazy(() =>
    import("./pages/BookingsPendingApproval")
  );
  const CreateServicePage = lazy(() => import("./pages/CreateServicePage"));
  const UpdateServicePage = lazy(() => import("./pages/UpdateServicePage"));
  const VerifyPage = lazy(() => import("./pages/VerifyPage"));
  const LoginPage = lazy(() => import("./pages/LoginPage"));
  const RegisterPage = lazy(() => import("./pages/RegisterPage"));
  const Page404 = lazy(() => import("./pages/Page404"));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
      {accountType && <Notifications />}
      <Alerts />
    </ThemeProvider>
  );
};

export default App;
