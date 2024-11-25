import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTaiKlUuhY2eQFmXNBQK1bkZMV-tZ1t4U",
    authDomain: "portfolio-server-809b8.firebaseapp.com",
    projectId: "portfolio-server-809b8",
    storageBucket: "portfolio-server-809b8.firebasestorage.app",
    messagingSenderId: "972570594438",
    appId: "1:972570594438:web:ca9034981d23071a889507",
    measurementId: "G-5HBC2YGM7E"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const db = typeof window !== "undefined" ? getFirestore(app) : null;

export { db, app, auth };
