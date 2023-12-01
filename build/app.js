import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const form = document.querySelector('#form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const googleBtn = document.querySelector('#google-btn');
const githubBtn = document.querySelector('#github-btn');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      window.location.href = 'home.html';
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

// Google Authentication
const googleProvider = new GoogleAuthProvider();
googleBtn.addEventListener('click', () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      addUserDataToFirestore(user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

// GitHub Authentication
const githubProvider = new GithubAuthProvider();
githubBtn.addEventListener('click', () => {
  signInWithPopup(auth, githubProvider)
    .then((result) => {
      const user = result.user;
      addUserDataToFirestore(user);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

// Function to add user data to Firestore
function addUserDataToFirestore(user) {
  addDoc(collection(db, "users"), {
    name: user.displayName,
    email: user.email,
    uid: user.uid,
    profileUrl: user.photoURL
  })
    .then((res) => {
      console.log(res);
      window.location.href = 'home.html';
    })
    .catch((err) => {
      console.log(err);
    });
}
