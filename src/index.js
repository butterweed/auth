require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

const app = express();

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.database();

app.use(bodyParser.json());

app.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  auth
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    let userId = userCredential.user.uid;

      return db
        .ref("users/" + userId)
        .set({ firstName: firstName, lastName: lastName, email: email });
    })
    .then(() => {
      console.log("Added user");
      res.send({
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/sign-out", (req, res) => {
  auth
    .signOut()
    .then(() => res.send("User has been signed out"))
    .catch(() => {
      res.send("err");
    });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      db.ref("users")
        .child(userCredential.user.uid).on("value", (snapshot) => {
          res.send(snapshot);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get('/reset-password', (req, res) => {
  const { email } = req.body;

  auth.sendPasswordResetEmail(email).then(() => {
    res.send('Email comming your way')
  }).catch((err) => {
    res.send(err)
  });
})

app.listen(3000, () => {
  console.log(`Listening on http://localhost:${3000}`);
});
