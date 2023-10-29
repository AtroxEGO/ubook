import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import App from "./App";
import reportWebVitals from "./utils/reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./services/store/store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// #TODO:
// - Optimize landing page search bar

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <App />
    </LocalizationProvider>
  </Provider>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
