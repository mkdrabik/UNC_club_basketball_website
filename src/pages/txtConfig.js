import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { config } from "./config.js";

const firebaseConfig = {
  apiKey: config.MY_KEY,
  authDomain: "unc-club-basketball.firebaseapp.com",
  projectId: "unc-club-basketball",
  storageBucket: "unc-club-basketball.appspot.com",
  messagingSenderId: "582213429987",
  appId: "1:582213429987:web:23d579063ad1fba1cf33d6",
  measurementId: "G-N1HC2VFRFC",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const txtDB = getFirestore(app);
const auth = getAuth();

export { txtDB, auth };
