import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAowjQ8KVubHexrLZErE2-KaFOpOQTFzYg",
  authDomain: "linkedin-clone-72c2b.firebaseapp.com",
  projectId: "linkedin-clone-72c2b",
  storageBucket: "linkedin-clone-72c2b.appspot.com",
  messagingSenderId: "170793207520",
  appId: "1:170793207520:web:31c61c83668a0af9f8b285",
};

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
