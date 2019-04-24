import React, { useState, useEffect } from "react";

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
    cleanUp();
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
              <div className="file has-name is-link mb1">
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
                className={`button is-small is-danger is-outlined ${loadingButton}`}
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

export default ChangeAvatar;
