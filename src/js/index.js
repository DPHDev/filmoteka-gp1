import {getAPI} from "./request-api";
import { varDOM } from "./var-selector-dom";
import { renderPost } from "./renderPost";
import { detailsMovieValues } from "./modal-movie-details";

const { movieName, onSearchBtn, modalContainer, modalP, modalCloseBtn } = varDOM;

const page = 1;
let movListGen;
// Async funtion expecting all movie cards to be displayed
async function renderPostAsync(data, page, movListGen) {
  return new Promise((resolve) => {
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
            modalContainer.style.display = "block";
            // modalP.textContent = id_movie.dataset.id;
            console.log(id_movie.dataset.id);
            detailsMovieValues(id_movie.dataset.id);
        });
    });
    // Event click close button modal window
    modalCloseBtn.addEventListener('click', () => {
        modalContainer.style.display = "none";
    });


}

renderMoviesInit();

onSearchBtn.addEventListener('click', async () => {
    if (movieName.value != '') {
        const posts = await getAPI.movies(movieName.value.trim(), page);
        await renderPostAsync(posts, page, movListGen);

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


