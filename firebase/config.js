import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDikAWeVDas3MSDzZxKU2bX3lewuFp3Y_E",
  authDomain: "socialsite-e6692.firebaseapp.com",
  projectId: "socialsite-e6692",
  storageBucket: "socialsite-e6692.appspot.com",
  messagingSenderId: "845736254183",
  appId: "1:845736254183:web:dd24aef9848e00b28be042"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);