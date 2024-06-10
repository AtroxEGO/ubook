import { BrowserRouter } from "react-router-dom";
import {
  Box,
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import defaultTheme from "./utils/themes";
import { useSelector } from "react-redux";
import { Suspense, useEffect, useMemo } from "react";
import ReactGA from "react-ga";
import Alerts from "./components/Alerts";
import Notifications from "./components/Notifications";
import Router from "./utils/Router";
const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;

ReactGA.initialize(TRACKING_ID);

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const accountType = useSelector(
    (state) => state.accountReducer?.accountData?.account
  );

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const theme = useMemo(
    () => defaultTheme(accountType, prefersDarkMode),
    [accountType, prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Suspense
          fallback={
            <Box
              width="100%"
              height="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center">
              <CircularProgress />
            </Box>
          }>
          <Router />
        </Suspense>
      </BrowserRouter>
      {accountType && <Notifications />}
      <Alerts />
    </ThemeProvider>
  );
};

export default App;
