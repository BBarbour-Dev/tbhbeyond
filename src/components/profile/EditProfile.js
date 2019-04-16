import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../config/context";
import useAuth from "../../hooks/useAuth";

const EditProfile = () => {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  return (
    <section className="mt3">
      <div className="container">
        <div className="columns is-centered is-mobile">
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
          </div>
        </div>
      </div>
    </section>
  );
};

const ChangeAvatar = ({ firebase, user }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);
  const loadingButton = loading ? `is-loading` : null;
  useEffect(() => {
    if (user.avatar !== avatar) {
      firebase
        .user(user.uid)
        .set({ avatar }, { merge: true })
        .catch(err => {
          setError(err);
        });
    }
  }, [avatar]);
  const cleanUp = () => {
    setFile(null);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/gif"
    ) {
      setError({ message: "Only jpeg, png, and gif file types allowed." });
      return;
    }
    if (file.size > 500000) {
      setError({ message: "Image must be less than 500 KB." });
      return;
    }
    firebase.uploadAvatar(file).on(
      "state_changed",
      snapshot => {
        setLoading(true);
      },
      err => {
        setError(err);
      },
      () => {
        firebase
          .uploadAvatar(file)
          .snapshot.ref.getDownloadURL()
          .then(url => {
            setAvatar(url);
            setLoading(false);
            setCompleted(true);
            setTimeout(() => {
              setCompleted(false);
            }, 5000);
          });
      }
    );
  };
  return (
    <div className="columns">
      <div className="column is-two-fifths">
        <figure className="image is-128x128 is-inline-block">
          <img src={avatar} alt={user.username} className="is-rounded" />
        </figure>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="control">
              <div className="file has-name mb1">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="image"
                    onChange={e => setFile(e.target.files[0])}
                  />
                  <span className="file-cta">
                    <span className="file-icon">
                      <i className="fas fa-upload" />
                    </span>
                    <span className="file-label">Choose a file…</span>
                  </span>
                  <span className="file-name">
                    {file ? file.name : "Choose an image."}
                  </span>
                </label>
              </div>
              {completed && (
                <div className="notification is-success">
                  Avatar upload completed!
                </div>
              )}
              {error && (
                <div className="notification is-danger">{error.message}</div>
              )}
              <button
                disabled={file === null}
                type="submit"
                className={`button is-small ${loadingButton}`}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChangeAbout = ({ firebase, user }) => {
  const [location, setLocation] = useState(user.about.location);
  const [website, setWebsite] = useState(user.about.website);
  const [facebook, setFacebook] = useState(user.about.social.facebook);
  const [instagram, setInstagram] = useState(user.about.social.instagram);
  const [twitter, setTwitter] = useState(user.about.social.twitter);
  const [bio, setBio] = useState(user.about.bio);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const loadingButton = loading ? "is-loading" : null;
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    firebase
      .user(user.uid)
      .set(
        {
          about: {
            location,
            website,
            social: {
              facebook,
              instagram,
              twitter
            },
            bio
          }
        },
        { merge: true }
      )
      .then(() => {
        setLoading(false);
        setCompleted(true);
        setTimeout(() => {
          setCompleted(false);
        }, 5000);
      })
      .catch(err => {
        setError(err);
      });
  };
  return (
    <div className="columns">
      <div className="column is-two-fifths">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Location</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Website</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Facebook</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={facebook}
                onChange={e => setFacebook(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Instagram</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={instagram}
                onChange={e => setInstagram(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Twitter</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={twitter}
                onChange={e => setTwitter(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Bio</label>
            <div className="control">
              <textarea
                value={bio}
                className="textarea mb1"
                onChange={e => setBio(e.target.value)}
              />
              {completed && (
                <div className="notification is-success">
                  About information updated!
                </div>
              )}
              {error && (
                <div className="notification is-danger">{error.message}</div>
              )}
              <button
                type="submit"
                className={`button is-small ${loadingButton}`}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
