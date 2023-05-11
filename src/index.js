import { getMovies, getMovieWeek, getMovie } from './js/fetchMovie';
import { printCard, deletechildrens } from './js/funtions';

const searchForm = document.getElementById('search-form');
let gallery = document.getElementById('gallery');

getMovieWeek()
  .then(data => {
    gallery.insertAdjacentHTML('afterbegin', printCard(data.results));
    console.log(data.results);
  })
  .catch(error => {
    // Manejo de errores
    console.log('Ha ocurrido un error:', error);
  });

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  let query = searchForm.searchQuery.value;
  console.log(query);
  getMovies(query)
    .then(data => {
      console.log('Ejecutado');
      console.log(data.results);
      if (data.results.length == 0) {
        console.log('No se encontraron resultados...');
      } else {
        console.log(printCard(data.results));
        deletechildrens(gallery);
        gallery.insertAdjacentHTML('afterbegin', printCard(data.results));
      }
    })
    .catch(error => {
      // Manejo de errores
      console.log('Ha ocurrido un error:', error);
    });
});

gallery.addEventListener('click', e => {
  e.preventDefault();
  const id = e.target.dataset.id;
  console.log(id);
  getMovie().then(data => {
    console.log(data);
  });
});
