import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvFEBwqir1QQhfTDgH9JaTrfNhWi_iC1M",
  authDomain: "eventbokking-ff683.firebaseapp.com",
  projectId: "eventbokking-ff683",
  storageBucket: "eventbokking-ff683.appspot.com",
  messagingSenderId: "620821162132",
  appId: "1:620821162132:web:bd2a0869d7be2bd1112c81",
  measurementId: "G-G0NY1SS02Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();
export const technical=collection(db,"Techical");
export const registereddata=collection(db,"Registrations");