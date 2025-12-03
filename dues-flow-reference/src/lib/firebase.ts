// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// TODO: For production, move these to environment variables (VITE_FIREBASE_API_KEY, etc.)
const firebaseConfig = {
    apiKey: "AIzaSyBh57_IdsfKsgUIRF-LmnJCZVkszGFVSLw",
    authDomain: "waitlist-9f029.firebaseapp.com",
    projectId: "waitlist-9f029",
    storageBucket: "waitlist-9f029.firebasestorage.app",
    messagingSenderId: "311584684016",
    appId: "1:311584684016:web:d9384e39b51ec234470f35",
    measurementId: "G-NX6V14WSVQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// TODO: Remove this console.log for production
// console.log("Firebase initialized with project:", firebaseConfig.projectId); 