// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getFirestore } from "firebase/firestore"; // For Firestore

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3rF3nT061vqZa5p0YQKySsck4qly00uo",
  authDomain: "wedding-rsvp-3a671.firebaseapp.com",
  projectId: "wedding-rsvp-3a671",
  storageBucket: "wedding-rsvp-3a671.firebasestorage.app",
  messagingSenderId: "685521714044",
  appId: "1:685521714044:web:141ee36defa732e98482f9",
  measurementId: "G-9M05BPSN9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database instance
export const database = getDatabase(app); // Use Firestore instead of getDatabase for Cloud Firestore
