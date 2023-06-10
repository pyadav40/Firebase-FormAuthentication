// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0Ie4riPNvZouNi2tCVtCVXQRZr-i64QM",
  authDomain: "reactformdata-ae3fa.firebaseapp.com",
  databaseURL: "https://reactformdata-ae3fa-default-rtdb.firebaseio.com",
  projectId: "reactformdata-ae3fa",
  storageBucket: "reactformdata-ae3fa.appspot.com",
  messagingSenderId: "980440613335",
  appId: "1:980440613335:web:7f0b10be022013ee184b92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };
