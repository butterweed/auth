require('dotenv').config();
const bodyParser = require("body-parser");
const express = require("express");
const firebase = require("firebase/app");
const admin = require("firebase-admin");
require("firebase/auth")
require("firebase/firestore")

const app = express();

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ,
  databaseURL: process.env.FIREBASE_DATABASE_URL ,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID
};

firebase.initializeApp(firebaseConfig);

admin.initializeApp();

const auth = firebase.auth();
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

app.use(bodyParser.json());

app.get("/sign-up", (req, res) => {
  const { email, password } = req.body;

  auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
    res.send(userCredential)
  })
});

app.listen(3000, () => {
  console.log(`Listening on http://localhost:${3000}`);
});
