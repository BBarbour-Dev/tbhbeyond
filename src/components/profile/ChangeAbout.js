import React, { useState } from "react";

const ChangeAbout = ({ firebase, user }) => {
  const [location, setLocation] = useState(user.about.location);
  const [username, setUsername] = useState(user.username);
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
          username,
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
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
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
            </div>
          </div>
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
            className={`button is-small is-danger ${loadingButton}`}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeAbout;
