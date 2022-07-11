import React, { useEffect, useState } from "react";
import Router from "./Router";
import { auth } from "../fBase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        // setInit(true);
        setUserObj(user);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  return (
    <div>
      {init ? (
        <Router isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

export default App;
