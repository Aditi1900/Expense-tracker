// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvNpAYmB727hC_jB8TDk8V5lx2VO_9xKw",
  authDomain: "expense-tracker-265dc.firebaseapp.com",
  projectId: "expense-tracker-265dc",
  storageBucket: "expense-tracker-265dc.appspot.com",
  messagingSenderId: "370696590647",
  appId: "1:370696590647:web:03d3e00dfb9cf28aaf76b2",
  measurementId: "G-1D64HT1EPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init 
//firebase deploy