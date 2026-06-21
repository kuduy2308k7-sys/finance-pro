import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUQVONQFjkFTNylkRtDDuysIXoPK5uzSQ",
  authDomain: "financepro-duy07.firebaseapp.com",
  projectId: "financepro-duy07",
  storageBucket: "financepro-duy07.firebasestorage.app",
  messagingSenderId: "727800580919",
  appId: "1:727800580919:web:39799051532d2ba62fe8b2",
  measurementId: "G-0RN12XXT3S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
