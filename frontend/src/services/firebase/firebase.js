// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from "firebase/app";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2Dxq7Bss_7jT4lgKcw8zPA5qoujxxBA4",
  authDomain: "matka-pretest-e6a17.firebaseapp.com",
  projectId: "matka-pretest-e6a17",
  storageBucket: "matka-pretest-e6a17.appspot.com",
  messagingSenderId: "410778953746",
  appId: "1:410778953746:web:9e5098bdeef33e0d0110cb",
  measurementId: "G-SNVNYEDLKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);