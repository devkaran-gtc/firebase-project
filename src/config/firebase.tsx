// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB46tbWruDcU35orJQJp6fesfPQi-szLbY",
  authDomain: "web-project-30dea.firebaseapp.com",
  projectId: "web-project-30dea",
  storageBucket: "web-project-30dea.appspot.com",
  messagingSenderId: "951023408710",
  appId: "1:951023408710:web:0bf704f6515b5c67f5dc47",
  measurementId: "G-PJP9KVZ9QT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const fireStoreDB = new getFirestore(app);
export const storage = new getStorage(app);
