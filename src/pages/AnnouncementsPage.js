import { useState, useEffect, useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import { getNotesAndPostsWithAccessToken } from "./api/fetchnotes";

function AnnouncementsPage() {
  const { accessToken } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getNotesAndPostsWithAccessToken(
          accessToken,
          438457904841
        );
        setAnnouncements(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Announcements</h1>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id} className="mb-4">
            <h2 className="text-xl font-bold">{announcement.text}</h2>
            <p className="text-gray-600">{announcement.creationTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnnouncementsPage;
