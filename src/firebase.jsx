// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQyoUSCOCfyCnBZZygfj5iPkAOmnq_uxs',
  authDomain: 'movies-9d86f.firebaseapp.com',
  projectId: 'movies-9d86f',
  storageBucket: 'movies-9d86f.appspot.com',
  messagingSenderId: '76541569602',
  appId:'1:76541569602:web:6e6814680d227c17b75bdb',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);