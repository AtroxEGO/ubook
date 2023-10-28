import { createTheme } from "@mui/material";

export const userThemeOptions = (prefersDarkMode) => {
  return {
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#1976d0",
      },
      secondary: {
        main: "#9c27b0",
      },
    },
  };
};

export const businessThemeOptions = (prefersDarkMode) => {
  return {
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#9c27b0",
      },
      secondary: {
        main: "#1976d0",
      },
    },
  };
};

const defaultTheme = (accountType, prefersDarkMode) => {
  const themeOptions =
    accountType === "business"
      ? businessThemeOptions(prefersDarkMode)
      : userThemeOptions(prefersDarkMode);
  return createTheme(themeOptions);
};

export default defaultTheme;
