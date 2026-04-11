// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pfe-project-e4a57.firebaseapp.com",
  projectId: "pfe-project-e4a57",
  storageBucket: "pfe-project-e4a57.firebasestorage.app",
  messagingSenderId: "101768502240",
  appId: "1:101768502240:web:745daee70cd4a9bf756985",
  measurementId: "G-RWNPTDPYNE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);