// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7LTn_iYEnvjSC5_oBHrqDVkrpPO-IexA",
  authDomain: "cashflow-8cb9b.firebaseapp.com",
  projectId: "cashflow-8cb9b",
  storageBucket: "cashflow-8cb9b.firebasestorage.app",
  messagingSenderId: "550976798283",
  appId: "1:550976798283:web:580d86408ece34253057ce",
  measurementId: "G-6GM9NNGD0G"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);