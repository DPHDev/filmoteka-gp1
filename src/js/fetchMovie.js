const apiKey = '050776d92f59975128a30e8f83c93796';

export async function getMovies(query) {
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getMovie(query) {
  let url = `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function getMovieWeek() {
  let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
