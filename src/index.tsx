import "./wdyr";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DevTools, loadServer } from "jira-dev-tool";
// 务必在 jira-dev-tool 后面引入
import "antd/dist/antd.less";
import { AppProviders } from "context";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
loadServer(() =>
  root.render(
    // <React.StrictMode>
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>
    // </React.StrictMode>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
