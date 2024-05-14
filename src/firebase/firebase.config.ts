// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtt6Yr1voqTZ5lh5fKqCTJIOVluEppcpo",
  authDomain: "test-auth-515d3.firebaseapp.com",
  projectId: "test-auth-515d3",
  storageBucket: "test-auth-515d3.appspot.com",
  messagingSenderId: "381407662745",
  appId: "1:381407662745:web:6c7942d81a0932944c1e08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
