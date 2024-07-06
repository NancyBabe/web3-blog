import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAU3CjNVFXPuSKWCcbggGbiWVsc4NBYLfE",
  authDomain: "blog-app-73a5e.firebaseapp.com",
  projectId: "blog-app-73a5e",
  storageBucket: "blog-app-73a5e.appspot.com",
  messagingSenderId: "926442839866",
  appId: "1:926442839866:web:34f0022c5ac1e22b1aba03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage =getStorage(app);
export const db = getFirestore(app); //for storing data into firestore
export default app;