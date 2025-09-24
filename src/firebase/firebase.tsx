import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBMCnveNMJ6Knnot-G_YQVcI0lhx5QIwtA",
  authDomain: "savannah-movies-8df36.firebaseapp.com",
  projectId: "savannah-movies-8df36",
  storageBucket: "savannah-movies-8df36.firebasestorage.app",
  messagingSenderId: "762629172165",
  appId: "1:762629172165:web:e775daf270bd9c43fdf9ac",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
