import React from 'react';

const SignInButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Sign in with Google
    </button>
  );
};

export default SignInButton;
