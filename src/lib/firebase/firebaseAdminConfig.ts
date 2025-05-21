import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccountString = process.env.FIREBASE_ADMIN_KEY;
  if (!serviceAccountString) {
    throw new Error("Missing FIREBASE_ADMIN_KEY in environment variables");
  }

  const serviceAccount = JSON.parse(Buffer.from(serviceAccountString, "base64").toString("utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const adminFirestore = admin.firestore(); //firebase instance database
export const adminAuth = admin.auth(); //authentication