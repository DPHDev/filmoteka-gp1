import { getAPI, getMovie } from './request-api';
import { varDOM } from './var-selector-dom';
import { renderPost, printCard, pageNow, total_pgs } from './renderPost';
import { detailsMovieValues } from './modal-movie-details';
import { paginationButtons, renderPerPagination } from './pagination';
import { scrollTop } from './scroll-top';
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
  modalFooter,
  scrollTopBtn,
} = varDOM;

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
async function renderMoviesInit(page) {
  const postTrending = await getAPI.trendMovies(page);
  const movieListGenres = await getAPI.genres();
  movListGen = movieListGenres.slice();
  await renderPostAsync(postTrending, page, movieListGenres);
  // Rendering pagination
  paginationButtons();

  document
    .getElementById('pg-contoler')
    .addEventListener('click', async event => {
      if (event.target && event.target.matches('#num-page-btn')) {
        const page = event.target;
        const postTrendingPage = await getAPI.trendMovies(page.textContent);
        await renderPostAsync(
          postTrendingPage,
          page.textContent,
          movieListGenres
        );

        paginationButtons();
        // Selection of element DOM
        console.log(pageNow);
        const detail_movie = document.querySelectorAll('.movie-card');

        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
          const id_movie = movie.querySelector('a');
          movie.addEventListener('click', () => {
            modalContainer.style.display = 'block';
            detailsMovieValues(id_movie.dataset.id);
          });
        });
      } else if (event.target && event.target.matches('#pg-advance-btn')) {
        pageAdv = pageNow === total_pgs ? pageNow : pageNow + 1;
        const postTrendingPageAdv = await getAPI.trendMovies(pageAdv);
        await renderPostAsync(postTrendingPageAdv, pageAdv, movieListGenres);
        paginationButtons();
        console.log(pageNow);

        const detail_movie = document.querySelectorAll('.movie-card');

        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
          const id_movie = movie.querySelector('a');
          movie.addEventListener('click', () => {
            modalContainer.style.display = 'block';
            detailsMovieValues(id_movie.dataset.id);
          });
        });
      } else if (event.target && event.target.matches('#pg-back-btn')) {
        pageBack = pageNow === 1 ? pageNow : pageNow - 1;
        const postTrendingPageBack = await getAPI.trendMovies(pageBack);
        await renderPostAsync(postTrendingPageBack, pageBack, movieListGenres);
        paginationButtons();

        console.log(pageNow);

        const detail_movie = document.querySelectorAll('.movie-card');
        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
          const id_movie = movie.querySelector('a');
          movie.addEventListener('click', () => {
            modalContainer.style.display = 'block';
            detailsMovieValues(id_movie.dataset.id);
          });
        });
      }
    });

  const detail_movie = document.querySelectorAll('.movie-card');
  //Event click open movie details by class .movie-card
  
  detail_movie.forEach(movie => {
    const id_movie = movie.querySelector('a');
    movie.addEventListener('click', () => {
      modalContainer.style.display = 'block';
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
}

renderMoviesInit(page);

onSearchBtn.addEventListener('click', async () => {
  if (movieName.value != '') {
    const posts = await getAPI.movies(movieName.value.trim(), page);
    console.log(posts.data.total_results);
    if (posts.data.total_results >= 1) {
      await renderPostAsync(posts, page, movListGen);
      // Rendering pagination buttons
      paginationButtons();
      // Rendering photocards per paginations numbers buttons
      renderPerPagination();
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

openModalFooter.addEventListener('click', () => {
  modalFooter.style.display = 'block';
});
closeModalFooter.addEventListener('click', () => {
  modalFooter.style.display = 'none';
});

// Scroll button to top
window.addEventListener('scroll', scrollTop);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//Close modal btn

modalCloseBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none';
});
