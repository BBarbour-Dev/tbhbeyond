import React from "react";
import ReactDOM from "react-dom";

import "bulmaswatch/lux/bulmaswatch.min.css";

import App from "./components/App";
import Firebase from "./config/firebase";
import { FirebaseContext } from "./config/context";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
