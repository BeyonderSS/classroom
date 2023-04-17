import React, { useContext } from "react";
import AuthContext from "../pages/contexts/AuthContext";
import { createEventWithMeetLink } from "../pages/api/createmeeting";

const CreateMeeting = () => {
  const { accessToken } = useContext(AuthContext);
  async function generateMeetLink() {
    const eventDetails = {
      summary: 'Your event summary',
      start: {
        dateTime: '2023-04-25T10:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: '2023-04-25T12:00:00-07:00',
        timeZone: 'America/Los_Angeles',
      },
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
