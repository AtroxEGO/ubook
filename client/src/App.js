import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  Alert,
  CssBaseline,
  Snackbar,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import defaultTheme from "./utils/themes";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { removeSnack } from "./services/store/features/snackSlice";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const dispatch = useDispatch();
  const accountType = useSelector(
    (state) => state.accountReducer?.accountData?.accountType
  );
  const snack = useSelector((state) => state.snackReducer);

  const handleSnackbarClose = () => {
    dispatch(removeSnack());
  };

  const theme = useMemo(
    () => defaultTheme(accountType, prefersDarkMode),
    [accountType, prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
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
            path="/login"
            element={<LoginPage />}
          />
        </Routes>
      </BrowserRouter>
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}>
        <Alert severity={snack?.type}>{snack?.message}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
