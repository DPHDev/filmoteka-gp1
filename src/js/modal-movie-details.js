import { varDOM } from "./var-selector-dom";
import { getAPI } from "./request-api";


const {
    modalContainer, modalImgPoster, modalCloseBtn,
    modalTitle, modalInfoValues, modalDescMovie,
    modalWatchedBtn, modalQueueBtn, defaultPoster
} = varDOM;

export async function detailsMovieValues(id_movie) {
    const movieInfoObj = await getAPI.detailMovie(id_movie);
    const { backdrop_path, poster_path, original_title, title, vote_average, vote_count, popularity, genres, overview, id } = movieInfoObj.data;
    
    // Destructuration object genres to array of names
    let desGenres = '';
    const gen = movieInfoObj.data.genres;
        gen.forEach(element => {
            desGenres += element.name+' | ';
    });

    //image poster
    if (poster_path != null) {
        modalImgPoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    } else if(backdrop_path != null){
        modalImgPoster.src = `https://image.tmdb.org/t/p/w500${backdrop_path}`;
    } else {
        modalImgPoster.src = defaultPoster;
    };
    // title movie
    modalTitle.textContent = title;
    // film values
    const markup = `
        <li>${vote_average}/${vote_count}</li>
        <li>${popularity}</li>
        <li>${original_title}</li>
        <li>${desGenres}</li>`
    modalInfoValues.innerHTML = markup;
    // Description
    modalDescMovie.textContent = overview;
    
}

