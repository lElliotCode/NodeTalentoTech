// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkc52d0bKhwbd6NRtm9oODByQQRQrxdoM",
  authDomain: "node-api-rest-ea6fa.firebaseapp.com",
  projectId: "node-api-rest-ea6fa",
  storageBucket: "node-api-rest-ea6fa.firebasestorage.app",
  messagingSenderId: "533572991046",
  appId: "1:533572991046:web:a13cac4aa2e7b734937247",
  measurementId: "G-PMTJZ0MG00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

