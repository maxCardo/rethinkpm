import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import App from "./App";
import "./tailwind-output.css"; // ✅ the generated one

const RootComponent = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<RootComponent />, document.getElementById("root"));
