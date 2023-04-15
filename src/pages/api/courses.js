import { classroom } from "../../lib/googleClassroom";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Retrieve the tokens from your database or session
    // ...

    try {
      const response = await classroom.courses.list({ pageSize: 10 });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
