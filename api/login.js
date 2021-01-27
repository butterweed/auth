const auth = require("../lib/firebase");
const db = require("../db");

module.exports = (req, res) => {
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
};