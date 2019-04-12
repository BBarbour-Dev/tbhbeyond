import { useState, useEffect } from "react";

const useAuth = firebase => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    const listener = firebase.onAuthListener(
      userAuth => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(userAuth);
      },
      () => {
        localStorage.removeItem("user");
        setUser(null);
      }
    );
    return () => listener;
  }, [user]);

  return [user];
};

export default useAuth;
