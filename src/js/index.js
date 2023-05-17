import { getAPI, getMovie } from './request-api';
import { varDOM } from './var-selector-dom';
import { renderPost, printCard } from './renderPost';
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
  scrollTopBtn
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
    selecPage = document.querySelectorAll('#num-page-btn');
    selecPage.forEach(page => {
        page.addEventListener('click', async () => {
            const postTrendingPage = await getAPI.trendMovies(page.textContent);
            await renderPostAsync(postTrendingPage, page.textContent, movieListGenres);
            
            const detail_movie = document.querySelectorAll('.movie-card');

            //Event click open movie details by class .movie-card
            detail_movie.forEach(movie => {
                const id_movie = movie.querySelector('a');
                movie.addEventListener('click', () => {
                    modalContainer.style.display = "block";         
                    detailsMovieValues(id_movie.dataset.id);
                });
            });
        })
    });
    //Trending pagination advance button
    advancePage = document.getElementById('pg-advance-btn')
    advancePage.addEventListener('click', async () => {
        pageAdv = pageNow === total_pgs ? pageNow : pageNow + 1;
        const postTrendingPageAdv = await getAPI.trendMovies(pageAdv);
        await renderPostAsync(postTrendingPageAdv, pageAdv, movieListGenres);

        const detail_movie = document.querySelectorAll('.movie-card');

        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
            const id_movie = movie.querySelector('a');
            movie.addEventListener('click', () => {
                modalContainer.style.display = "block";         
                detailsMovieValues(id_movie.dataset.id);
            });
        });
    });
    //Trending pagination back button
    backPage = document.getElementById('pg-back-btn')
    backPage.addEventListener('click', async () => {
        pageBack = pageNow === 1 ? pageNow : pageNow - 1;
        const postTrendingPageBack = await getAPI.trendMovies(pageBack);
        await renderPostAsync(postTrendingPageBack, pageBack, movieListGenres);

        const detail_movie = document.querySelectorAll('.movie-card');

        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
            const id_movie = movie.querySelector('a');
            movie.addEventListener('click', () => {
                modalContainer.style.display = "block";         
                detailsMovieValues(id_movie.dataset.id);
            });
        });
    });
    // Element selector by class .movie-card
    const detail_movie = document.querySelectorAll('.movie-card');

    //Event click open movie details by class .movie-card
    detail_movie.forEach(movie => {
        const id_movie = movie.querySelector('a');
        movie.addEventListener('click', () => {
            modalContainer.style.display = "block";         
            detailsMovieValues(id_movie.dataset.id);
        });
    });
    // Event click close button modal window
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.style.display = "none";
    });
  });
  // Event click close button modal window
  modalCloseBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none';
  });
}

renderMoviesInit(page);

onSearchBtn.addEventListener('click', async () => {
    if (movieName.value != '') {
        const posts = await getAPI.movies(movieName.value.trim(), page);
        console.log(posts.data.total_results);
        if(posts.data.total_results >= 1){
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
                    modalContainer.style.display = "block";
                    detailsMovieValues(id_movie.dataset.id);
                });
            });
            
        }else{
            error.innerHTML = "No se encontraron Resultados";
        }
       
     
    } else {
        return window.alert('Please write something!');
    }
});
movieName.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        onSearchBtn.click();
    }
});

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
  setQueue(modalQueueBtn.value);
});

modalWatchedBtn.addEventListener('click', e => {
  e.preventDefault();
  setWatched(modalWatchedBtn.value);
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
