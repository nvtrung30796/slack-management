// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDf5OQ7W3q2txaFbB45OAdcYidFTxkGPS8",
//   authDomain: "slack-backend-34c35.firebaseapp.com",
//   projectId: "slack-backend-34c35",
//   storageBucket: "slack-backend-34c35.appspot.com",
//   messagingSenderId: "829899914511",
//   appId: "1:829899914511:web:cb30a8d48b907e5de1127a",
//   measurementId: "G-EDSWYY1KLJ"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import * as FirebaseAdmin from 'firebase-admin'


var credentialAuth  = require("./chat-app-4c4e7-firebase-adminsdk-9bdn0-a7d366abe4.json");

try {
  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(credentialAuth)
  });
  console.log("Firebase admin initialized")
} catch (err: any){
  console.error("Firebase admin initialization error: ")
}


const firestoreAdmin = FirebaseAdmin.firestore();
export {FirebaseAdmin, firestoreAdmin}