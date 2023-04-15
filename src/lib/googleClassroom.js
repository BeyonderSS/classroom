import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const classroom = google.classroom({
  version: "v1",
  auth: oauth2Client
});

export { oauth2Client, classroom };
