// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJ1ohLaNDFOOWbI1BHUVHH8zqshuXwvAk",
  authDomain: "shiftswap-2e284.firebaseapp.com",
  databaseURL: "https://shiftswap-2e284-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shiftswap-2e284",
  storageBucket: "shiftswap-2e284.firebasestorage.app",
  messagingSenderId: "1054022504962",
  appId: "1:1054022504962:web:f5bec3ac14eccb17cd8d1b",
  measurementId: "G-Z0QB84KT3T"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
