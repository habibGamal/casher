import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider, theme } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          // colorPrimary: '#6366f1',
          colorPrimary: "#47388d",
          // colorFillSecondary: "#FFC02B",
          // colorFillTertiary: "#FFC02B",
          // colorPrimaryBg: "#DB9D1F",
          // colorPrimaryText: "#DB9D1F",
          // colorPrimaryTextActive: "#DB9D1F",
          // colorTextQuaternary: "#DB9D1F",
          // colorTextSecondary: "#DB9D1F",
          // colorTextTertiary: "#DB9D1F",
          // colorTextBase: "#DB9D1F",
          // colorText: "#DB9D1F",
          // colorTextHeading: "#DB9D1F",

          fontSize: 18,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
