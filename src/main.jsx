import React from "react";
import ReactDOM from "react-dom/client";
import { SetupRouterProvider } from "./router";
import "./common.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SetupRouterProvider />
  </React.StrictMode>
);
