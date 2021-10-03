// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpSG3ndK3ZrzHjZF9tmIzHyIVm_Nfsbwo",
  authDomain: "listify73.firebaseapp.com",
  projectId: "listify73",
  storageBucket: "listify73.appspot.com",
  messagingSenderId: "246758204402",
  appId: "1:246758204402:web:775bc61d0dd92fbe8dc16b",
  measurementId: "G-DPVZQ7NH51"
};

let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };