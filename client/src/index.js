import React from "react";
import ReactDOM from "react-dom/client"; // <-- updated import
import "bootstrap/dist/css/bootstrap.min.css";

import { Provider } from "react-redux";
import store from "./store";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import "./App.css";
import App from "./App";
import "./tailwind-output.css";

const theme = createTheme();

const RootComponent = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

// Updated React 18 root rendering
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<RootComponent />);
