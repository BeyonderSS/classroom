import React, { createContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getCoursesWithAccessToken } from "../pages/api/listcourses"

const AuthContext = createContext();

async function signInWithGoogle() {
  // ... (same as before)
  const provider = new GoogleAuthProvider();
  provider.addScope(
    "https://www.googleapis.com/auth/classroom.courses.readonly"
  );

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const user = result.user;
    console.log(user);
    console.log("Access Token:", accessToken);
    document.cookie = `accessToken=${accessToken}; path=/;`;
    getCoursesWithAccessToken(accessToken);
    // ... (rest of your code)
  } catch (error) {
    // Handle Errors here
    console.error("Error signing in with Google:", error);
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    // ... (same as before)
    await signInWithGoogle();
  };

  async function handleSignOut() {
    // ... (same as before)
    try {
        // Sign out the user
        await signOut(auth);
        console.log(auth);
        // Update the user state to null
        setUser(null);
  
        // Clear the courses state
  
        // You can also perform additional tasks, such as navigating to a different page or showing a success message
        console.log("Successfully signed out!");
      } catch (error) {
        console.error("Error signing out:", error);
      }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
