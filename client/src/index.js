import { SnackbarProvider } from "notistack";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import "./sass/index.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <SnackbarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>
  // </React.StrictMode>
);
