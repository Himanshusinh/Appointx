import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';  // Import Firebase Storage
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD5gWa8ibnsA-_R1Tm7p6qmY6ehyBAXuu0",
  authDomain: "appointment-1663f.firebaseapp.com",
  projectId: "appointment-1663f",
  storageBucket: "appointment-1663f.appspot.com",
  messagingSenderId: "153315357525",
  appId: "1:153315357525:web:a28c74085121653f78b5dc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
