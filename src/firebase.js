// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCqGNJPhIrDXcqx5My2ahNoEVtS5n2cVrs",
	authDomain: "dashboard-react-ff383.firebaseapp.com",
	projectId: "dashboard-react-ff383",
	storageBucket: "dashboard-react-ff383.appspot.com",
	messagingSenderId: "491972765901",
	appId: "1:491972765901:web:9027c18d6b21472232e184",
	measurementId: "G-3C6EMHSK6E"
  };
// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore();
const auth = getAuth(app)
const provider =  new GoogleAuthProvider();
const analytics = getAnalytics(app);

 export {provider, db , auth}