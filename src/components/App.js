import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./Navigation";

const App = () => {
  return (
    <div>
      <Router>
        <Navigation />
      </Router>
    </div>
  );
};

export default App;
