import React, { useContext } from "react";
import { FirebaseContext } from "../../config/context";
import useAuth from "../../hooks/useAuth";

import ChangeAvatar from "./ChangeAvatar";
import ChangeAbout from "./ChangeAbout";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

const EditProfile = () => {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  return (
    user && (
      <section className="content-gap">
        <div className="container">
          <div className="columns is-centered">
            <div
              className="column is-four-fifths box"
              style={{ padding: "3rem" }}
            >
              <h1 className="is-size-3">Edit Profile</h1>
              <hr />
              <h2 className="is-size-5 mb1">Avatar</h2>
              <ChangeAvatar firebase={firebase} user={user} />
              <hr />
              <h2 className="is-size-5 mb1">About</h2>
              <ChangeAbout firebase={firebase} user={user} />
              <hr />
              <h2 className="is-size-5 mb1">Change Password</h2>
              <ChangePassword firebase={firebase} />
              <hr />
              <h2 className="is-size-5 mb1">Change Email</h2>
              <ChangeEmail user={user} firebase={firebase} />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default EditProfile;
