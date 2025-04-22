// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./redux/userSlice";
import appStore from "./redux/appStore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDIyWlDu9YvhIk5eQ6jqPd8tEraP8dacA",
  authDomain: "video-app-4c078.firebaseapp.com",
  projectId: "video-app-4c078",
  storageBucket: "video-app-4c078.firebasestorage.app",
  messagingSenderId: "891727920758",
  appId: "1:891727920758:web:82ada02b2c64f3f730e957",
  measurementId: "G-5PGKKY3KXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
