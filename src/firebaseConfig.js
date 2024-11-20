// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgqntDF6rJ_MKLkUV04HNzAlEmJ8dLDFQ",
  authDomain: "brhrng-e53c0.firebaseapp.com",
  projectId: "brhrng-e53c0",
  storageBucket: "brhrng-e53c0.firebasestorage.app",
  messagingSenderId: "811377979795",
  appId: "1:811377979795:web:ca8737715030af3b413866",
  measurementId: "G-EM7X8XHLRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
