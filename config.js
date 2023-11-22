import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyBGnKKwHC2Im1Xqp9XhzscWjQc4Etq4sZU",
    authDomain: "asad-todo-app.firebaseapp.com",
    projectId: "asad-todo-app",
    storageBucket: "asad-todo-app.appspot.com",
    messagingSenderId: "1004069457114",
    appId: "1:1004069457114:web:eefcdc7d3d35b837dae9e3",
    measurementId: "G-M49KN8KMFF"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);