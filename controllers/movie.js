const paging = require("../utils/paging");
const Movie = require("../models/Movie");

exports.getData = (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = Movie.allMovies();
    const results = paging(data, page);
    if (!!results?.errorMessage) {
      return res.status(400).send(results);
    }
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
  }
};

exports.getTrending = (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = Movie.getTreding();
    const results = paging(data, page);
    if (!!results?.errorMessage) {
      return res.status(400).send(results);
    }
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
  }
};

exports.getTopRated = (req, res) => {
  try {
    const page = req.query.page || 1;
    const data = Movie.getTreding();
    const results = paging(data, page);
    if (!!results?.errorMessage) {
      return res.status(400).send(results);
    }
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
  }
};

exports.getMoviesByGenre = (req, res) => {
  try {
    if (!req.query.genre_id) {
      return res.status(400).send({ errorMessage: "Not found genre params" });
    }

    const page = req.query.page || 1;
    const genre_id = req.query.genre_id;

    const data = Movie.getMoviesByGenre(genre_id);
    if (!!data?.errorMessage) {
      return res.status(400).send(data);
    }

    const results = paging(data.movies, page);
    if (!!results?.errorMessage) {
      return res.status(400).send(results);
    }
    res.status(200).send({ ...results, genre_name: data.genre_name });
  } catch (e) {
    console.error(e);
  }
};

exports.getTrailer = (req, res) => {
  try {
    const filmId = req.body.film_id;
    if (!filmId) {
      return res.status(400).send({ errorMessage: "Not found film_id parram" });
    }
    const data = Movie.getTrailer(filmId);
    if (!!data?.errorMessage) {
      return res.status(404).send(data);
    }
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
  }
};

exports.searchMovie = (req, res) => {
  try {
    const page = req.query.page || 1;
    const keyword = req.body.keyword;
    if (!keyword) {
      return res.status(400).send({ errorMessage: "Not found keyword parram" });
    }

    const data = Movie.searchMovies(req.body);

    const results = paging(data, page);
    if (!!results?.errorMessage) {
      return res.status(400).send(results);
    }
    res.status(200).send(results);
  } catch (e) {
    console.error(e);
  }
};
