// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjK5aDgwNSbe67JVyFUVoX_1s35Xj-9CI",
  authDomain: "forest-duel.firebaseapp.com",
  projectId: "forest-duel",
  storageBucket: "forest-duel.appspot.com",
  messagingSenderId: "343664287897",
  appId: "1:343664287897:web:66b350e09763db194ed808",
  measurementId: "G-28XP0PMC6T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };
