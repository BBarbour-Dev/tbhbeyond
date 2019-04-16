import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../config/context";

const useAuth = () => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const listener = firebase.onAuthListener(
      userAuth => {
        localStorage.setItem("user", JSON.stringify(userAuth));
        setUser(userAuth);
      },
      () => {
        localStorage.removeItem("user");
        setUser(null);
      }
    );
    return () => listener;
  }, []);

  return [user];
};

export default useAuth;
