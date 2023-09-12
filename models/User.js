const fs = require("fs");

const User = {
  allUsers: function () {
    const users = JSON.parse(fs.readFileSync("data/userToken.json", "utf8"));
    return users;
  },
};

module.exports = User;
