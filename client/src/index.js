import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<RootComponent />, document.getElementById("root"));
