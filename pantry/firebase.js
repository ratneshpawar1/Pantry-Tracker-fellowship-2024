// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8lVM_-Bwl7gc9ct766e9W0Gb4yHVk2uA",
  authDomain: "pantry-tracker-bee18.firebaseapp.com",
  projectId: "pantry-tracker-bee18",
  storageBucket: "pantry-tracker-bee18.appspot.com",
  messagingSenderId: "991988201200",
  appId: "1:991988201200:web:064c79bcaa47cb020b3435",
  measurementId: "G-D9RHHH9FXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };