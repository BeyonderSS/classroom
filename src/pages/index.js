import React, { useContext } from "react";
import SignInButton from "../components/SignInButton";
import AuthContext from "./contexts/AuthContext";
import { coursesData } from './api/listcourses.js';



// Now you can use the coursesData variable to access the course data

export default function Home() {
  const { user, signInWithGoogle, handleSignOut } = useContext(AuthContext);
  console.log(user)
  console.log(coursesData);

 

  return (
    <div>
      {/* Render your UI based on the user state */}
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <SignInButton onClick={signInWithGoogle} />
      )}
    </div>
  );
}
