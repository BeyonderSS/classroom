import React, { useContext } from "react";
import AuthContext from "../pages/contexts/AuthContext";
import { createEventWithMeetLink } from "../pages/api/createmeeting";

const CreateMeeting = () => {
  const { accessToken } = useContext(AuthContext);
  async function generateMeetLink() {
    console.log(accessToken)
    const eventDetails = {
      summary: "Test meeting with Google Meet link",
      location: "Online",
      start: {
        dateTime: "2023-04-19T09:00:00",
        timeZone: "America/New_York",
      },
      end: {
        dateTime: "2023-04-19T10:00:00",
        timeZone: "America/New_York",
      },
      attendees: [
        {
          email: "example1@example.com",
        },
        {
          email: "example2@example.com",
        },
      ],
    };
    try {
      await createEventWithMeetLink(accessToken, eventDetails);
    } catch (error) {
      console.error('Error generating Google Meet link:', error);
    }
  }
  

  return (
    <div>
      <button onClick={generateMeetLink} className="bg-blue-500 rounded-md">
        Create Meeting
      </button>{" "}
    </div>
  );
};

export default CreateMeeting;

