const fs = require("fs");

const Videos = {
  allVideos: function () {
    const videos = JSON.parse(fs.readFileSync("data/videoList.json", "utf8"));
    return videos;
  },
};

module.exports = Videos;
