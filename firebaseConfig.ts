import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4rqztaiHd9-9I9cYdkkIP8tkwFHG5ipQ",
  authDomain: "miviajep2.firebaseapp.com",
  projectId: "miviajep2",
  storageBucket: "miviajep2.appspot.com",
  messagingSenderId: "767542129819",
  appId: "1:767542129819:web:531c6e4b2340131a75c23e",
  measurementId: "G-72MLM376HD",
};
//1.Poner aquí el vapidKey de firebase
export const vapidKey =
  "BAmKFmLMxb92-TC_O6yYmW9Ai3_3jrmf_dLEzeBapRDsOQWCG-bY6xjrZVc5k_CmZp7hYdAX0_5HNG3C-F8Jhqk";

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
