// api/fetchnotes.js 

export async function getNotesAndPostsWithAccessToken(accessToken, courseId) {
    const url = `https://classroom.googleapis.com/v1/courses/${courseId}/announcements`;
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
        const announcements = data.announcements;
        // You can process the announcements data as needed
        console.log(announcements);
        return announcements;
      } else {
        throw new Error("Failed to fetch notes and posts from Google Classroom API");
      }
    } catch (error) {
      console.error("Error fetching notes and posts:", error);
      throw error;
    }
  }
  