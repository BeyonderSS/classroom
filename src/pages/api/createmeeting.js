export async function createEventWithMeetLink(accessToken, eventDetails) {
  const url = "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const requestBody = {
    ...eventDetails,
    conferenceData: {
      createRequest: {
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
        requestId: "some-random-string", // Make sure to generate a unique string for each request
      },
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      const meetLink = data.conferenceData.entryPoints.find(
        (entryPoint) => entryPoint.entryPointType === "video"
      ).uri;
      console.log("Google Meet link:", meetLink);
      return data;
    } else {
      throw new Error("Failed to create event with Google Meet link");
    }
  } catch (error) {
    console.error("Error creating event with Google Meet link:", error);
    throw error;
  }
}
