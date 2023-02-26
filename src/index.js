import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LicenseInfo } from "@mui/x-license-pro";
import { muiLicenseKey } from "./TopSecret";

LicenseInfo.setLicenseKey(muiLicenseKey);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
