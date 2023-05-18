import { getAPI, getMovie } from './request-api';
import { varDOM } from './var-selector-dom';
import { renderPost, printCard } from './renderPost';
import { detailsMovieValues } from './modal-movie-details';
import {
  setQueue,
  setWatched,
  getQueue,
  getWatched,
  getGenre,
  deletechildrens,
  searchId,
  removeQueue,
  removeWatched
} from './localStorage';
import { theme } from './theme-dark';

const {
  movieName,
  onSearchBtn,
  modalContainer,
  modalP,
  modalCloseBtn,
  modalQueueBtn,
  modalWatchedBtn,
  buttonWatchet,
  buttonQueue,
  buttons,
  clearWatched,
  clearQueue,
  library,
  filmsRender,
  home,
  error,
  openModalFooter,
    closeModalFooter,
  modalFooter
} = varDOM;

//ocultar Elementos Deimer Gutierrez...
removewatch = document.getElementById('removewatch');
removequeue = document.getElementById('removequeue');

const page = 1;
let movListGen;
// Async funtion expecting all movie cards to be displayed
async function renderPostAsync(data, page, movListGen) {
  return new Promise(resolve => {
    const renderedHTML = renderPost(data, page, movListGen);
    resolve(renderedHTML);
  });
}

// Charge render movie trending
async function renderMoviesInit() {
  const postTrending = await getAPI.trendMovies();
  const movieListGenres = await getAPI.genres();
  movListGen = movieListGenres.slice();
  await renderPostAsync(postTrending, page, movieListGenres);

  // Element selector by class .movie-card
  const detail_movie = document.querySelectorAll('.movie-card');

  //Event click open movie details by class .movie-card
  
  detail_movie.forEach(movie => {
    const id_movie = movie.querySelector('a');
    movie.addEventListener('click', () => {
      modalContainer.style.display = 'block';
      // modalP.textContent = id_movie.dataset.id;

      detailsMovieValues(id_movie.dataset.id);
      modalWatchedBtn.textContent = "ADD TO WATCHED";
      modalQueueBtn.textContent = "ADD TO QUEUE";
      if(searchId(id_movie.dataset.id, 'Watched') == true){
        modalWatchedBtn.textContent = "REMOVE FROM WHATCHED";  
        console.log(searchId(id_movie.dataset.id, 'Watched'))      
      }
      if(searchId(id_movie.dataset.id, 'Queue') == true){
        modalQueueBtn.textContent = "REMOVE FROM QUEUE";
      }
    });
  });
  // Event click close button modal window
  modalCloseBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
}

renderMoviesInit();

onSearchBtn.addEventListener('click', async () => {
  if (movieName.value != '') {
    const posts = await getAPI.movies(movieName.value.trim(), page);
    console.log(posts.data.total_results);
    if (posts.data.total_results >= 1) {
      await renderPostAsync(posts, page, movListGen);

      // Element selector by class .movie-card
      const detail_movie = document.querySelectorAll('.movie-card');

      //Event click open movie details by class .movie-card
      detail_movie.forEach(movie => {
        const id_movie = movie.querySelector('a');
        movie.addEventListener('click', () => {
          modalContainer.style.display = 'block';
          detailsMovieValues(id_movie.dataset.id);
        });
      });
    } else {
      error.innerHTML = 'No se encontraron Resultados';
    }
  } else {
    return window.alert('Please write something!');
  }
});

movieName.addEventListener('keydown', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    onSearchBtn.click();
  }
});

//Acceder al LocalStorage Deimer Gutierrez....

modalQueueBtn.addEventListener('click', e => {
  e.preventDefault();
  if(modalQueueBtn.textContent == "ADD TO QUEUE"){
    setQueue(modalQueueBtn.value);
    modalQueueBtn.textContent = 'REMOVE FROM QUEUE'
  }else{
    removeQueue(modalQueueBtn.value);
    modalQueueBtn.textContent = 'ADD TO QUEUE'
    console.log('remove');
  }
  
});

modalWatchedBtn.addEventListener('click', e => {
  e.preventDefault();
  if(modalWatchedBtn.textContent == "ADD TO WATCHED"){
    setWatched(modalWatchedBtn.value);
    modalWatchedBtn.textContent = 'REMOVE FROM WATCHED'
  }else{
    removeWatched(modalWatchedBtn.value);
    modalWatchedBtn.textContent = 'ADD TO WATCHED'
    console.log('remove');
  } 
});



// MEMBERS MODAL/FOOTER MODAL
// document.addEventListener('DOMContentLoaded', () => {
//   const modalRef = {
//     openFooterModal: document.querySelector('[data-modal-open]'),
//     closeFooterModal: document.querySelector('[data-modal-close]'),
//     footerModal: document.querySelector('[data-footer-modal]')
//   };

//   function toggleModal() {
//     modalRef.footerModal.classList.toggle('is-hidden');
//   }

//   modalRef.openFooterModal.addEventListener('click', toggleModal);
//   modalRef.closeFooterModal.addEventListener('click', toggleModal);
// });

openModalFooter.addEventListener('click', () => {
    modalFooter.style.display = 'block';
});
closeModalFooter.addEventListener('click', () => {
  modalFooter.style.display = 'none';
});