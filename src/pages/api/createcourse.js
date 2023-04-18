// api/createcourse.js

export async function createCourseWithAccessToken(accessToken, courseData) {
  const url = "https://classroom.googleapis.com/v1/courses";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
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