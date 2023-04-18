import fetch from 'node-fetch';

export async function createCourseWithAccessToken(accessToken) {
  const url = "https://classroom.googleapis.com/v1/courses";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };
  
  // Individual course fields
  const name = "Test Course";
  const section = "A";
  const description = "This is a test course";
  const room = "101";
  const ownerId = "me";
  const courseState = "ACTIVE";

  // Course data object
  const courseData = {
    name,
    section,
    description,
    room,
    ownerId,
    courseState
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(courseData)
    });

    if (response.ok) {
      const data = await response.json();
      const createdCourse = data;
      // You can process the createdCourse data as needed
      console.log(createdCourse);
      return createdCourse;
    } else {
      throw new Error("Failed to create course using Google Classroom API");
    }
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}
