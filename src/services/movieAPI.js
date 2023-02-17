const readMovies = () => JSON.parse(localStorage.getItem('movies'));
const API_TIMEOUT = 800;

const saveMovies = (movies) => localStorage.setItem('movies', JSON.stringify(movies));

const resolveOk = (resolve) => {
  setTimeout(() => {
    resolve('OK');
  }, API_TIMEOUT);
};

export const getMovies = () => (
  new Promise((resolve) => {
    setTimeout(() => {
      const movies = readMovies();
      resolve(movies);
    }, API_TIMEOUT);
  })
);

export const getMovie = (movieId) => {
  const movie = readMovies().find((mov) => mov.id === parseInt(movieId, 10));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movie);
    }, API_TIMEOUT);
  });
};

export const updateMovie = (updatedMovie) => {
  const movies = readMovies().map((movie) => {
    if (movie.id === parseInt(updatedMovie.id, 10)) {
      return { ...movie, ...updatedMovie };
    }
    return movie;
  });
  saveMovies(movies);

  return new Promise(resolveOk);
};

export const createMovie = (movieData) => {
  let movies = readMovies();
  const nextId = movies[movies.length - 1].id + 1;
  const newMovie = { ...movieData, id: nextId };
  movies = [...movies, newMovie];
  saveMovies(movies);

  return new Promise(resolveOk);
};

export const deleteMovie = (movieId) => {
  let movies = readMovies();
  movies = movies.find((movie) => movie.id !== parseInt(movieId, 10));
  saveMovies(movies);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: 'OK' });
    }, API_TIMEOUT);
  });
};
