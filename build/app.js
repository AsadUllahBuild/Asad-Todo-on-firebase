import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth, db, storage } from "./config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js'

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
      window.location = 'home.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

    });

})

// google authentication

const provider = new GoogleAuthProvider();

googleBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {

      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
      addDoc(collection(db, "users"), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profileUrl: user.photoURL
      }).then((res) => {
        console.log(res);
        window.location = 'home.html'
      }).catch((err) => {
        console.log(err);
      })
    })
}).catch((error) => {

  const errorMessage = error.message;
  console.log(errorMessage);

});

// GitHub Authentication
const githubProvider = new GithubAuthProvider();
githubBtn.addEventListener('click', () => {
    signInWithPopup(auth, githubProvider)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(token);
            console.log(user);
            addDoc(collection(db, "users"), {
                name: user.displayName,
                uid: user.uid,
                profileUrl: user.photoURL
            }).then((res) => {
                console.log(res);
                window.location = 'home.html';
            }).catch((err) => {
                console.log(err);
            });
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})


// 
// githubBtn.addEventListener('click', ()=>{
//   signInWithPopup(auth, provider)
//   .then((result) => {
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     console.log(token);
//     const user = result.user;
//     console.log(user);
//     window.location='home.html'
//   }).catch((error) => {
//     const errorMessage = error.message;
//     console.log(errorMessage);
//   });

// })




