const { auth, db } = require("../lib/firebase");

module.exports = (req, res) => {
  const { email } = req.body;

  auth.sendPasswordResetEmail(email).then(() => {
    res.send('Email comming your way')
  }).catch((err) => {
    res.send(err)
  });
};