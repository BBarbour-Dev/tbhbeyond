import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../config/context";
import useAuth from "../../hooks/useAuth";
import moment from "moment";

import Loader from "../Loader";

const UserProfile = ({ location, history }) => {
  const [user] = useAuth();
  const firebase = useContext(FirebaseContext);
  const profileUID = location.pathname.split("/")[2];
  const [profile, setProfile] = useState(null);
  const [current, setCurrent] = useState(false);
  const urlRef = useRef(null);
  const [copied, setCopied] = useState("");
  const clipboardCopy = e => {
    urlRef.current.select();
    e.target.focus();
    document.execCommand("copy");
    setCopied("Copied to Clipboard");
    setTimeout(() => {
      setCopied("");
    }, 5000);
  };
  useEffect(() => {
    const datafetch = firebase
      .user(profileUID)
      .get()
      .then(snapshot => {
        const profileData = snapshot.data();
        if (!profileData) {
          history.push("/none");
        } else {
          setProfile(profileData);
        }
        if (user) {
          setCurrent(profileUID === user.uid);
        }
      });
    return () => datafetch;
  }, []);
  const loaded = (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div
            className="column is-three-fifths box"
            style={{ padding: "3rem" }}
          >
            <ProfileTop profile={profile} current={current} />
            <EditButton current={current} />
            <hr />
            <div className="has-text-centered">
              <p>
                <button
                  className="button is-small is-danger"
                  onClick={e => {
                    return !copied ? clipboardCopy(e) : null;
                  }}
                >
                  <span className="icon is-small">
                    <i className="fas fa-share-alt" />
                  </span>
                  <span>Share</span>
                </button>{" "}
                <input
                  type="text"
                  className="input is-small"
                  style={{ width: "25%" }}
                  ref={urlRef}
                  value={window.location.href.toString()}
                  readOnly
                />{" "}
                {copied ? (
                  <span className="tag is-normal is-light">{copied}</span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <div className="columns is-centered content-gap">
          <div
            className="column is-three-fifths box"
            style={{ padding: "3rem" }}
          >
            <h2 className="is-size-3 mb1">Characters</h2>
            <CharacterList firebase={firebase} profileUID={profileUID} />
          </div>
        </div>
      </div>
    </section>
  );
  return profile ? loaded : <Loader />;
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
        <Link className="button is-danger" to="/user/edit-profile">
          Edit Profile
        </Link>
      ) : null}
    </div>
  );
};

const CharacterList = ({ firebase, profileUID }) => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = firebase
      .userCharacters(profileUID)
      .orderBy("lastUpdatedDate", "desc")
      .get()
      .then(snapshot => {
        const retrievedChars = [];
        snapshot.forEach(doc => {
          const characterDoc = doc.data();
          retrievedChars.push({ profile: characterDoc, id: doc.id });
        });
        setCharacters(retrievedChars);
      });
    return () => fetchCharacters;
  }, []);
  return characters.length > 0 ? (
    <table className="table is-fullwidth">
      <tbody>
        <tr>
          <th>Name</th>
          <th>{`Class & level`}</th>
          <th>Link</th>
        </tr>
        {characters.map((character, index) => {
          return (
            <tr key={index}>
              <td>{character.profile.name}</td>
              <td>
                Level {character.profile.level} {character.profile.charClass}
              </td>
              <td>
                <Link to={`/characters/${character.id}`}>View</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <p>User has not created any characters.</p>
  );
};

export default UserProfile;
