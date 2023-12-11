// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzY4B5VzVnM0sVDIvFVE-Ts30bKC9d3gw",
  authDomain: "netflixgpt-d9be2.firebaseapp.com",
  projectId: "netflixgpt-d9be2",
  storageBucket: "netflixgpt-d9be2.appspot.com",
  messagingSenderId: "265089313254",
  appId: "1:265089313254:web:cbf40384c00160cc580e27",
  measurementId: "G-DLSHW689DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();