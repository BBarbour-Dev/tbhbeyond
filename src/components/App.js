import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthRoute, VerifyRoute, HideRoute } from "./RouteProtect";

import Navigation from "./Navigation";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import ForgotPass from "./authentication/ForgotPass";
import VerifyEmail from "./authentication/VerifyEmail";
import Landing from "./Landing";
import UserProfile from "./profile/UserProfile";
import Error404 from "./Error404";
import Footer from "./Footer";
import EditProfile from "./profile/EditProfile";
import NewCharacter from "./charactercreation/NewCharacter";
import Character from "./characterview/Character";
import CharacterManage from "./CharacterManage";

const App = () => {
  return (
    <Router>
      <div className="site">
        <Navigation />
        <div className="site-content">
          <Switch>
            <Route exact path="/" component={Landing} />
            <AuthRoute path="/verify-email" component={VerifyEmail} />
            <HideRoute path="/login" component={Login} />
            <HideRoute path="/register" component={Register} />
            <HideRoute path="/forgot-pass" component={ForgotPass} />
            <VerifyRoute path="/user/edit-profile" component={EditProfile} />
            <Route path="/user/:uid" component={UserProfile} />
            <VerifyRoute
              path="/characters/manage"
              component={CharacterManage}
            />
            <AuthRoute
              path="/characters/new-character"
              component={NewCharacter}
            />
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
