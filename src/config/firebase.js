import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

  //MERGE AUTH AND DB USER

  onAuthListener = (next, fallback) => {
    this.auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        this.db
          .collection("users")
          .doc(userAuth.uid)
          .get()
          .then(snapshot => {
            const dbUser = snapshot.data();
            if (!dbUser.role) {
              dbUser.role = "";
            }
            userAuth = {
              uid: userAuth.uid,
              email: userAuth.email,
              ...dbUser
            };
            next(userAuth);
          });
      } else {
        fallback();
      }
    });
  };

  //USER API
  user = uid => this.db.doc(`users/${uid}`);

  users = () => this.db.collection("users");
}

export default Firebase;
