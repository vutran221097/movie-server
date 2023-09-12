const router = require("express").Router();
const movieController = require("../controllers/movie");
const checkToken = require("../middleware/middleware");

module.exports = function (app) {
  router.get("/", movieController.getData);
  router.get("/trending", movieController.getTrending);
  router.get("/top-rate", movieController.getTopRated);
  router.get("/discover", movieController.getMoviesByGenre);
  router.post("/video", movieController.getTrailer);
  router.post("/search", movieController.searchMovie);
  app.use("/api/movies", checkToken, router);
};
