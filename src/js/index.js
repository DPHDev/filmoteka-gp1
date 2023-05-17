import {getAPI, getMovie} from "./request-api";
import { varDOM } from "./var-selector-dom";
import { renderPost, printCard, pageNow, total_pgs  } from "./renderPost";
import { detailsMovieValues } from "./modal-movie-details";
import { setQueue, setWatched, getQueue, getWatched, getGenre, deletechildrens } from "./localStorage";
import { theme } from "./theme-dark";
import { scrollTop } from "./scroll-top";
import { paginationButtons, renderPerPagination } from "./pagination";

const { movieName, onSearchBtn, modalContainer, modalCloseBtn, modalQueueBtn, modalWatchedBtn, buttonWatchet, buttonQueue, buttons, clearWatched, clearQueue, library, filmsRender, home, error, scrollTopBtn } = varDOM;
//ocultar Elementos Deimer Gutierrez...
buttons.style.display = "none";
clearWatched.style.display = "none";
clearQueue.style.display = "none";

const page = 1;
let movListGen;
export let selecPage;
// Async funtion expecting all movie cards to be displayed
async function renderPostAsync(data, page, movListGen) {
  return new Promise((resolve) => {
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

//Acceder al LocalStorage Deimer Gutierrez....

home.addEventListener('click', (e)=>{
    buttons.style.display = "none";
    clearWatched.style.display = "none";
    clearQueue.style.display = "none";
    e.preventDefault();
    renderMoviesInit();
});

modalQueueBtn.addEventListener('click', (e)=>{
    e.preventDefault();    
    setQueue(modalQueueBtn.value);
});

modalWatchedBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    setWatched(modalWatchedBtn.value);
});


buttonWatchet.addEventListener('click', (e)=>{
    e.preventDefault();
    let ids = getWatched();

});

library.addEventListener('click', (e)=>{
    e.preventDefault();
    let ids = getWatched();    
    buttons.style.display = "block";
    if(ids === null){
        filmsRender.innerHTML = `Oops! Your "watched" library is empty!`;
    }else{
        clearWatched.style.display = "block";
        deletechildrens(filmsRender);
        for (const id of ids) {
            getMovie(id).then(data=>{
                filmsRender.insertAdjacentHTML('beforeend',printCard(data));
            }).catch(error=>{
                console.log(error);
            });
        }       
    }
});

buttonWatchet.addEventListener('click', (e)=>{
    e.preventDefault();
    let ids = getWatched();    
    clearQueue.style.display = "none";   
    if(ids === null){
        filmsRender.innerHTML = `Oops! Your "watched" library is empty!`;
    }else{
        clearWatched.style.display = "block";
        deletechildrens(filmsRender);
        for (const id of ids) {
            getMovie(id).then(data=>{
                filmsRender.insertAdjacentHTML('beforeend',printCard(data));
            }).catch(error=>{
                console.log(error);
            });
        }       
    }
});

buttonQueue.addEventListener('click', (e)=>{
    e.preventDefault();
    let ids = getQueue();    
    clearWatched.style.display = "none";   
    if(ids === null){
        filmsRender.innerHTML = `Oops! Your "Queue" library is empty!`;
    }else{
        clearQueue.style.display = "block";
        deletechildrens(filmsRender);
        for (const id of ids) {
            getMovie(id).then(data=>{
                filmsRender.insertAdjacentHTML('beforeend',printCard(data));
            }).catch(error=>{
                console.log(error);
            });
        }       
    }
});

clearWatched.addEventListener('click', (e)=>{
    localStorage.removeItem('Watched');
    deletechildrens(filmsRender);
    clearWatched.style.display = "none";
});

clearQueue.addEventListener('click', (e)=>{
    localStorage.removeItem('Queue');
    deletechildrens(filmsRender);
    clearQueue.style.display = "none";
});

// Scroll button to top
window.addEventListener('scroll', scrollTop);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
