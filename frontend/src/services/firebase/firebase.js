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
  apiKey: "AIzaSyDkZkc2INSF579gglpkORoC7_B3rHEdL0A",
  authDomain: "matka-pretest.firebaseapp.com",
  projectId: "matka-pretest",
  storageBucket: "matka-pretest.appspot.com",
  messagingSenderId: "731773224873",
  appId: "1:731773224873:web:4be408d47ca821c55d26b8",
  measurementId: "G-66DQ0YRYVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);