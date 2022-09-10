import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// App's firebase configuration details. These don't need to be hidden as per the firebase documentation
const firebaseConfig = {
  apiKey: "AIzaSyD8PgReh2bT12zFLtZLGFchID-0e82FDxA",
  authDomain: "kinderpass-app.firebaseapp.com",
  projectId: "kinderpass-app",
  storageBucket: "kinderpass-app.appspot.com",
  messagingSenderId: "441449071115",
  appId: "1:441449071115:web:2c764aaa7896d271e17d0e",
};

// initialise firebase
export const apiClient = initializeApp(firebaseConfig);
// initialise firebase authentication and get a reference to the service
export const authClient = getAuth(apiClient);
// initialise firestore db
export const db = getFirestore(apiClient);
