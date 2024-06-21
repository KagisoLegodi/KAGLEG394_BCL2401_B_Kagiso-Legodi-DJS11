// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (updated)
const firebaseConfig = {
  apiKey: "AIzaSyCZflHe9ebB9L7yCl0OIeuhBKbzSYD0_ss",
  authDomain: "goat-cast.firebaseapp.com",
  projectId: "goat-cast",
  storageBucket: "goat-cast.appspot.com",
  messagingSenderId: "223528293691",
  appId: "1:223528293691:web:d9a166b50d70550c74131e",
};

// Initialize Firebase (only once)
const app = initializeApp(firebaseConfig);

// Get references to the services you need
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };
