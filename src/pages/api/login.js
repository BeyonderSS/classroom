
import firebase from "../../lib/firebase";
import { oauth2Client } from "../../lib/googleClassroom";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { idToken } = req.body;
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken);
    const { user } = await firebase.auth().signInWithCredential(credential);

    const tokens = await oauth2Client.getToken(req.body.code);
    oauth2Client.setCredentials(tokens);

    // Save the tokens in your database or session
    // ...

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
