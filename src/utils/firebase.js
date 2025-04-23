// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Only import getAnalytics if you're actually using it
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Only initialize analytics if you're using it and in the browser
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export const auth = getAuth(app);
