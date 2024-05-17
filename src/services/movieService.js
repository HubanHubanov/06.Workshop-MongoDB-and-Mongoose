const Movie = require("../models/Movie");
const Cast = require("../models/Cast");

exports.getAll =   () =>  Movie.find();

// TODO: Filter result in mongodb
exports.search = async (title, genre, year) => {
  let result = await Movie.find().lean();
  if (title) {
    result = result.filter((movie) =>
      movie.title
        .toLocaleLowerCase()
        .includes(title.toLowerCase())
    );
  }

  if (genre) {
    result = result.filter(
      (movie) => movie.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (year) {
    result = result.filter((movie) => movie.year === year);
  }
  return result;
};


exports.getOne = (movieId) =>  Movie.findById(movieId).populate("casts");

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
// return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});

  const movie = await this.getOne(movieId); 
   
  // This is optional.
  // const cast = await Cast.findById(castId);
  // cast.movies.push(movie);
  // await cast.save();

//TODO validate castId if exists
//TODO validate if cast has already been added
movie.casts.push(cast);

await movie.save();

return movie;
}