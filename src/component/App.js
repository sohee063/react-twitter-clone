import React, { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../fBase";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        // setInit(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }

      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = auth.currentUser;
    setUserObj({ ...user });
    setUserObj(user);
  };

  return (
    <div>
      {init ? (
        <Router
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
