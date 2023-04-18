import { useContext, useState } from "react";
import { createCourseWithAccessToken } from "../pages/api/createcourse";
import AuthContext from "../pages/contexts/AuthContext";

const CreateCourseForm = () => {

  const { accessToken } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState(""); // Added room state
  const [ownerId, setOwnerId] = useState(""); // Added ownerId state
  const [courseState, setCourseState] = useState(""); // Added courseState state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCreateCourse = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (accessToken) {
      try {
        // Create course data object
        const courseData = {
          name: name,
          section: section,
          description: description,
          room: room, // Added room field
          ownerId: ownerId, // Added ownerId field
          courseState: courseState, // Added courseState field
        };
        console.log(accessToken)
        // Call API function to create course
        const createdCourse = await createCourseWithAccessToken(
          accessToken,
           // Pass courseData as argument
        );

        // Set success state and reset input values
        setSuccess(true);
        setLoading(false);
        setName("");
        setSection("");
        setDescription("");
        setRoom(""); // Reset room field
        setOwnerId(""); // Reset ownerId field
        setCourseState(""); // Reset courseState field
      } catch (error) {
        // Set error state
        setError(error.message);
        setLoading(false);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create Course</h2>
      {success && (
        <div className="text-green-600 mb-4">Course created successfully!</div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      />
      <textarea
        className="border p-2 mb-2 w-full"
        rows="3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)} // Update to set room state
      />

      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Owner ID"
        value={ownerId}
        onChange={(e) => setOwnerId(e.target.value)} // Update to set ownerId state
      />

      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Course State"
        value={courseState}
        onChange={(e) => setCourseState(e.target.value)} // Update to set courseState state
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded font-semibold"
        onClick={handleCreateCourse}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
    </div>
  );
};

export default CreateCourseForm;
