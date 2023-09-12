const fs = require("fs");

const MediaType = {
  getMediaType: function () {
    const mediaType = JSON.parse(
      fs.readFileSync("data/mediaTypeList.json", "utf8")
    );
    return mediaType;
  },
};

module.exports = MediaType;
