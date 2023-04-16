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
  const [accessToken, setAccessToken] = useState(null); // Add accessToken state

  useEffect(() => {
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
      "https://www.googleapis.com/auth/classroom.courses.readonly"
    );

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(accessToken);
      setAccessToken(accessToken); // Set accessToken state
      const user = result.user;
      document.cookie = `accessToken=${accessToken}; path=/;`;
      getCoursesWithAccessToken(accessToken);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setAccessToken(null); // Reset accessToken state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, signInWithGoogle, handleSignOut }} // Include accessToken in the context value
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
