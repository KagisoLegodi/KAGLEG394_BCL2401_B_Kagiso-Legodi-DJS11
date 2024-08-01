// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (updated)
const firebaseConfig = {
  apiKey: "AIzaSyD2DFFfuaVpXSFZ5zg1OpuVniWwNfx5jbk",
  authDomain: "goatcast-za.firebaseapp.com",
  projectId: "goatcast-za",
  storageBucket: "goatcast-za.appspot.com",
  messagingSenderId: "1087604501278",
  appId: "1:1087604501278:web:2ec9fc584f108d719af70f",
  measurementId: "G-N7REXSZK5D"
};

// Initialize Firebase (only once)
const app = initializeApp(firebaseConfig);

// Get references to the services you need
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
