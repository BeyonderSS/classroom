// pages/_middleware.js
import { getAuth } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function middleware({ req, res }) {
  const authInstance = getAuth(auth);
  const user = authInstance.currentUser;

  if (!user) {
    res.statusCode = 302;
    res.setHeader("Location", "/signin");
    res.end();
    return;
  }

  return NextResponse.next();
}
