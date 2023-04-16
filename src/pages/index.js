import React, { useContext } from "react";
import SignInButton from "../components/SignInButton";
import AuthContext from "../contexts/AuthContext";

export default function Home() {
  const { user, signInWithGoogle, signOut } = useContext(AuthContext);

  return (
    <div>
      {/* Render your UI based on the user state */}
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <SignInButton onClick={signInWithGoogle} />
      )}
    </div>
  );
}
