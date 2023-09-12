const fs = require("fs");

const Genre = {
  getGenreList: function () {
    const genreList = JSON.parse(
      fs.readFileSync("data/genreList.json", "utf8")
    );
    return genreList;
  },
};

module.exports = Genre;
