export async function getCoursesWithAccessToken(accessToken) {
  const url = "https://classroom.googleapis.com/v1/courses";
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers
    });

    if (response.ok) {
      const data = await response.json();
      const courses = data.courses;
      // You can process the courses data as needed
      courses.forEach(course => console.log(course.id)); // Logging the course ID
      return courses;
    } else {
      throw new Error("Failed to fetch courses from Google Classroom API");
    }
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
}
