import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../config/context";
import { Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

import Loader from "../Loader";

const UserProfile = ({ location }) => {
  const [user] = useAuth();
  const firebase = useContext(FirebaseContext);
  const profileUID = location.pathname.split("/")[2];
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(false);
  useEffect(() => {
    const datafetch = firebase
      .user(profileUID)
      .get()
      .then(snapshot => {
        const profileData = snapshot.data();
        if (!profileData) {
          setProfile("none");
        }
        setProfile(profileData);
        if (user) {
          setCurrent(profileUID === user.uid);
        }
      });
    return () => datafetch;
  }, []);
  const loaded =
    profile === "none" ? (
      <Redirect to="/none" />
    ) : (
      <section className="content-gap">
        <div className="container">
          <div className="columns is-centered">
            <div
              className="column is-four-fifths box"
              style={{ padding: "3rem" }}
            >
              <ProfileTop profile={profile} current={current} />
              <EditButton current={current} />
            </div>
          </div>
        </div>
      </section>
    );
  return !profile ? <Loader /> : loaded;
};

const ProfileTop = ({ profile, current }) => {
  const joined = moment
    .unix(profile.joined.seconds)
    .add(10, "days")
    .calendar();
  return (
    <>
      <div className="has-text-centered">
        <figure className="image is-128x128 is-inline-block">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="is-rounded"
          />
        </figure>
      </div>
      <article className="has-text-centered mt2">
        <h1 className="is-size-1">{profile.username}</h1>
        {current ? <p className="is-size-4">{profile.email}</p> : null}
      </article>
      <hr />
      <div className="columns is-centered is-mobile">
        <div className="column">
          <article className="has-text-centered">
            <h3 className="is-size-4 mt1">Joined</h3>
            <p>{joined}</p>
            <h3 className="is-size-4 mt1">Location</h3>
            {profile.about.location ? profile.about.location : "Unknown"}
            <h3 className="is-size-4 mt1">Website</h3>
            {profile.about.website ? (
              <a href={profile.about.website}>{profile.about.website}</a>
            ) : (
              "Unknown"
            )}
            <h3 className="is-size-4 mt1">Social Media</h3>
            <SocialMedia links={profile.about.social} />
            <h3 className="is-size-4 mt1">Bio</h3>
            <p>
              {profile.about.bio ? (
                profile.about.bio
              ) : (
                <em>"This user hasn't created their profile yet"</em>
              )}
            </p>
          </article>
        </div>
      </div>
    </>
  );
};

const SocialMedia = ({ links }) => {
  return (
    <p className="is-size-4">
      {links.facebook ? (
        <a href={links.facebook}>
          <i className="fab fa-facebook-square has-text-danger" />
        </a>
      ) : (
        <i className="fab fa-facebook-square" />
      )}
      {links.instagram ? (
        <a href={links.instagram}>
          <i className="fab fa-instagram has-text-danger" />
        </a>
      ) : (
        <i className="fab fa-instagram" />
      )}
      {links.twitter ? (
        <a href={links.twitter}>
          <i className="fab fa-twitter-square has-text-danger" />
        </a>
      ) : (
        <i className="fab fa-twitter-square" />
      )}
    </p>
  );
};

const EditButton = ({ current }) => {
  return (
    <div className="has-text-centered">
      {current ? (
        <Link className="button is-danger is-outlined" to="/edit-profile">
          Edit Profile
        </Link>
      ) : null}
    </div>
  );
};

export default UserProfile;
