// components/Login.js
import React, { useContext } from "react";
import SignInButton from "../components/SignInButton";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { user, signInWithGoogle, handleSignOut } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <SignInButton onClick={signInWithGoogle} />
      )}
    </div>
  );
}
