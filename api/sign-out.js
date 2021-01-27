const auth  = require("../lib/firebase");

module.exports = (req, res) => {
  auth
    .signOut()
    .then(() => res.send("User has been signed out"))
    .catch(() => {
      res.send("err");
    });
};