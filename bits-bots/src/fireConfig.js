import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9p80Ai0WcWOddoiUQVKYqeymGhAcbS2Q",
  authDomain: "bits-bots-project.firebaseapp.com",
  projectId: "bits-bots-project",
  storageBucket: "bits-bots-project.appspot.com",
  messagingSenderId: "54121848369",
  appId: "1:54121848369:web:0ae4265cf77a74275bbf10",
  measurementId: "G-N0FPWYEKQF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;
