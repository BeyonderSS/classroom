// api/createGoogleMeetLink.js 
async function createGoogleMeetLink(accessToken) {
    const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    };
  
    const event = {
      summary: "Google Meet Link",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "UTC"
      },
      end: {
        dateTime: new Date().toISOString(),
        timeZone: "UTC"
      },
      conferenceData: {
        createRequest: {
          requestID: Math.random().toString(),
          conferenceSolutionKey: {
            type: "hangoutsMeet"
          }
        }
      }
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(event)
      });
  
      if (response.ok) {
        const data = await response.json();
        const meetLink = data.hangoutLink;
        // You can use the meetLink as needed
        console.log("Google Meet Link:", meetLink);
        return meetLink;
      } else {
        throw new Error("Failed to create Google Meet link using Google Calendar API");
      }
    } catch (error) {
      console.error("Error creating Google Meet link:", error);
      throw error;
    }
  }
  
  