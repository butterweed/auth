const { auth, db } = require("../lib/firebase");

module.exports = (req, res) => {
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
};