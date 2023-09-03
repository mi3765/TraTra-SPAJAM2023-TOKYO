import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC46TB246z5PaikI8ce385BFJjY_wHht5Y",
    authDomain: "tokyospajam.firebaseapp.com",
    projectId: "tokyospajam",
    storageBucket: "tokyospajam.appspot.com",
    messagingSenderId: "506872934295",
    appId: "1:506872934295:web:ae36a8703465ed06f0ded2",
    measurementId: "G-F49J2WJHK9"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);