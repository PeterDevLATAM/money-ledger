import firebase from "firebase";
import 'firebase/firestore'
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoKu0vjf2zQy8gN_9m7jDba5ZDcZqDOzU",
  authDomain: "money-ledger-d382b.firebaseapp.com",
  projectId: "money-ledger-d382b",
  storageBucket: "money-ledger-d382b.appspot.com",
  messagingSenderId: "857550930083",
  appId: "1:857550930083:web:7de849e78a57eb3561ff16"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
export const auth = firebase.auth()
export const timestamp= firebase.firestore.Timestamp