const fs = require("fs");
const Genre = require("./Genre");
const Video = require("./Video");

const Movies = {
  allMovies: function () {
    const movies = JSON.parse(fs.readFileSync("data/movieList.json", "utf8"));
    return movies;
  },

  getTreding: function () {
    const allMovies = this.allMovies();
    // sort by popularity
    const trendingMovies = allMovies.sort(
      (a, b) => b.popularity - a.popularity
    );
    return trendingMovies;
  },

  getTopRated: function () {
    const allMovies = this.allMovies();
    // sort by vote
    const topRatedMovies = allMovies.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return topRatedMovies;
  },

  getMoviesByGenre: function (genre_id) {
    const allMovies = this.allMovies();
    const genreList = Genre.getGenreList();
    const idGenre = genreList.find((item) => item.id === Number(genre_id));
    if (!idGenre)
      return {
        errorMessage: "Not found that gerne id",
      };

    // get movie by gender id
    const genreMovies = allMovies.filter((item) =>
      item.genre_ids.includes(idGenre.id)
    );
    return { movies: genreMovies, genre_name: idGenre.name };
  },

  getTrailer: function (film_id) {
    const videosList = Video.allVideos();
    const movieInfo = videosList.find((item) => item.id === Number(film_id));

    if (!movieInfo) {
      return {
        errorMessage: "Not found video",
      };
    }

    // get trailer
    const movieFilterd = movieInfo.videos.filter((item) => {
      return (
        item.official &&
        item.site === "YouTube" &&
        (item.type === "Trailer" || item.type === "Teaser")
      );
    });

    // sort if multi results
    if (movieFilterd.length > 1) {
      movieFilterd.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      );
    }
    return movieFilterd[0];
  },

  searchMovies: function (searchBody) {
    const allMovies = this.allMovies();
    // filter movies for searching
    const searchedMovies = allMovies.filter((item) => {
      return (
        (item.overview
          ?.toLowerCase()
          .includes(searchBody.keyword.toLowerCase()) ||
          item.title
            ?.toLowerCase()
            .includes(searchBody.keyword.toLowerCase())) &&
        (!searchBody.genre
          ? true
          : item.genre_ids.includes(Number(searchBody.genre))) &&
        (!searchBody.mediaType || searchBody.mediaType === "all"
          ? true
          : item.media_type === searchBody.mediaType) &&
        (!searchBody.language
          ? true
          : item.original_language === searchBody.language) &&
        (!searchBody.year
          ? true
          : new Date(item.release_date).getFullYear() ===
            Number(searchBody.year))
      );
    });

    return searchedMovies;
  },
};

module.exports = Movies;
