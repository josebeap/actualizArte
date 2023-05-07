import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBa8aNoCvJL19PGCux4WL_0q_Fgcz390aM",
    authDomain: "actualizarte-e087b.firebaseapp.com",
    projectId: "actualizarte-e087b",
    storageBucket: "actualizarte-e087b.appspot.com",
    messagingSenderId: "1073721719108",
    appId: "1:1073721719108:web:8aaae2f36d7ed0bb93bf11"
  };



export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const STORAGE = getStorage(FIREBASE_APP);

