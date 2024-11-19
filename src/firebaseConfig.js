// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-ji_K96-SHM44s_OvT5nbua0n05ORn6E",
  authDomain: "brhrng-7cbc5.firebaseapp.com",
  projectId: "brhrng-7cbc5",
  storageBucket: "brhrng-7cbc5.firebasestorage.app",
  messagingSenderId: "1023104423833",
  appId: "1:1023104423833:web:052cfbd26a8bd524f62508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
