// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxj7vPIup2S5Kc4aCBBLEzqw3II-HjYM4",
  authDomain: "traxpensive.firebaseapp.com",
  projectId: "traxpensive",
  storageBucket: "traxpensive.appspot.com",
  messagingSenderId: "5696150432",
  appId: "1:5696150432:web:40f2a9adea06e7495e62c5",
  measurementId: "G-CC5BPLK07N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage();

