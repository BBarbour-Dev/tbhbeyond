import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthRoute from "./AuthRoute";

import Navigation from "./Navigation";
import Landing from "./Landing";
import UserProfile from "./profile/UserProfile";
import Error404 from "./Error404";
import Footer from "./Footer";
import EditProfile from "./profile/EditProfile";
import NewCharacter from "./charactercreation/NewCharacter";
import Character from "./characterview/Character";

const App = () => {
  return (
    <Router>
      <div className="site">
        <Navigation />
        <div className="site-content">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/user/:uid/:username" component={UserProfile} />
            <AuthRoute path="/edit-profile" component={EditProfile} />
            <AuthRoute path="/new-character" component={NewCharacter} />
            <Route path="/characters/:id" component={Character} />
            <Route component={Error404} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
