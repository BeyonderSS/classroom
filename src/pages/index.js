import React, { useState } from 'react';
import SignInButton from '../components/SignInButton';
import CoursesList from '../components/CoursesList';
import { GoogleAuthProvider,getAuth, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '@/lib/firebase';

async function signInWithGoogle() {
  // ... (same as the previous implementation)
  
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/classroom.courses.readonly");

  // const result =  getAuth();
  // signInWithPopup(provider);
  // const idToken = await result.user.getIdToken();
let idToken;
  const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    idToken = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
   console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  console.log(idToken)

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken, code: result.credential.accessToken }),
  });

}

async function getCourses() {
  // ... (same as the previous implementation)

  async function getCourses() {
    const response = await fetch("/api/courses");
    const data = await response.json();
  
    if (response.ok) {
      // Display the list of courses
      console.log(data.courses);
    } }                   
  
}

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    await signInWithGoogle();
    const newCourses = await getCourses();
    setCourses(newCourses);
  };


  async function handleSignOut() {
    try {
      // Sign out the user
      await signOut(auth);
  console.log(auth)
      // Update the user state to null
      setUser(null);
  
      // Clear the courses state
      setCourses([]);
  
      // You can also perform additional tasks, such as navigating to a different page or showing a success message
      console.log("Successfully signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  
  

  return (
    <div>
      <SignInButton onClick={handleSignIn} />
      <div>
        <button onClick={handleSignOut}>
Logout
        </button>
      </div>
      <CoursesList courses={courses} />
    </div>
  );
}
