import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-sq0PBtpfk8FZF6EKyvt9yro8phk1-bA",
  authDomain: "tpf1-2e5e1.firebaseapp.com",
  projectId: "tpf1-2e5e1",
  storageBucket: "tpf1-2e5e1.appspot.com",
  messagingSenderId: "280454785426",
  appId: "1:280454785426:web:567fc1662c83c19dfcb94b",
  measurementId: "G-SR5SFT9F90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");
const userSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " " + errorMessage);
    });
};
const userSignOut = async () => {
  signOut(auth)
    .then(() => {
      document.getElementById("profile").src = "placeholder.png";
      document.getElementById("name").value = "";
      document.getElementById("surname").value = "";
      document.getElementById("email").value = "";
      alert("You have been signed out!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " " + errorMessage);
    });
};
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("name").value = user.displayName.split(" ")[0];
    document.getElementById("surname").value = user.displayName.split(" ")[1];
    document.getElementById("email").value = user.email;
    localStorage.setItem("token", JSON.stringify(user.accessToken));
    var image = document.getElementById("profile");
    image.src = user.photoURL;
    console.log(user);
  }
});
signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
