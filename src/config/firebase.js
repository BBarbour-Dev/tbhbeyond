import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // AUTH API

  createNewUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  logoutUser = () => this.auth.signOut();

  resetUserPassword = email => this.auth.sendPasswordResetEmail(email);

  updateUserPassword = password =>
    this.auth.currentUser.updatePassword(password);

  updateUserEmail = email => this.auth.currentUser.updateEmail(email);

  // MERGE AUTH AND DB USER

  onAuthListener = (next, fallback) => {
    this.auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        this.db
          .collection("users")
          .doc(userAuth.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            userAuth = {
              uid: userAuth.uid,
              email: userAuth.email,
              avatar: userAuth.avatar,
              ...dbUser
            };
            next(userAuth);
          });
      } else {
        fallback();
      }
    });
  };

  // USER API
  user = uid => this.db.collection("users").doc(`${uid}`);

  users = () => this.db.collection("users");

  // STORAGE API
  uploadAvatar = file => this.storage.ref(`avatars/${file.name}`).put(file);

  avatars = () => this.storage.ref("avatars");

  //CHARACTER API
  addCharacter = character => this.db.collection("characters").add(character);

  character = id => this.db.collection("characters").doc(`${id}`);
}

export default Firebase;
