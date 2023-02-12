import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider,theme  } from 'antd';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      direction="rtl"
      theme={{
        token: {
          colorPrimary: '#6366f1',
          fontSize: 18,
        },
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
