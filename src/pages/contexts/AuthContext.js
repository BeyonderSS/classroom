// context/AuthContext.js

import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { getCoursesWithAccessToken } from "../api/listcourses";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check if access token is already stored in cookies
    const storedAccessToken = getCookie("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope(
      "https://www.googleapis.com/auth/classroom.courses",
      "https://www.googleapis.com/auth/classroom.coursework.me",
      "https://www.googleapis.com/auth/classroom.topics",
      "https://www.googleapis.com/auth/calendar.events"
    );

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      setAccessToken(accessToken);

      // Store access token in cookies
      document.cookie = `accessToken=${accessToken}; path=/;`;

      const user = result.user;
      getCoursesWithAccessToken(accessToken);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAccessToken(null);

      // Remove access token from cookies
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  // Helper function to get cookie value
  const getCookie = (name) => {
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(`${name}=`.length, cookie.length);
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, signInWithGoogle, handleSignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
