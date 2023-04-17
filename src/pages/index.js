import React, { useContext, useState, useEffect } from "react";
import SignInButton from "../components/SignInButton";
import AuthContext from "./contexts/AuthContext";
import { getCoursesWithAccessToken } from "./api/listcourses";
import CoursesList from "../components/CoursesList"; // Import the CoursesList component
import CreateCourseForm from "../components/CreateCourseForm";

export default function Home() {
  const { user, accessToken, signInWithGoogle, handleSignOut } =
    useContext(AuthContext);
  const [courses, setCourses] = useState([]); // State to store the courses data

  useEffect(() => {
    // Fetch courses data when accessToken changes
    const fetchCourses = async () => {
      if (accessToken) {
        // Check if accessToken is available
        try {
          const coursesData = await getCoursesWithAccessToken(accessToken);
          setCourses(coursesData); // Update the courses state with fetched data
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();
  }, [accessToken]); // Run the effect whenever accessToken changes

  return (
    <div>
      {/* Render your UI based on the user state */}
      {user ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          {/* Render the CoursesList component with the courses data */}
          <CoursesList courses={courses} />
          {/* <CreateCourseForm/> */}
        </div>
      ) : (
        <SignInButton onClick={signInWithGoogle} />
      )}
    </div>
  );
}
