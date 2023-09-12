const User = require("../models/User");

const checkToken = (req, res, next) => {
  const usersToken = User.allUsers().map((item) => item.token);
  const accessToken = req.query.api_key;

  // check token
  if (!usersToken.includes(accessToken) || !accessToken) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  next();
};

module.exports = checkToken;
