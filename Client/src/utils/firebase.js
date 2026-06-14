import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zyraai-a2482.firebaseapp.com",
  projectId: "zyraai-a2482",
  storageBucket: "zyraai-a2482.firebasestorage.app",
  messagingSenderId: "350754002328",
  appId: "1:350754002328:web:0dc41de528410419ed87ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider}

