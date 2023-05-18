// import genresList from './genres';
import { varDOM } from "./var-selector-dom";
import { getGenre } from "./localStorage";

let count = 0;
export let total_pgs, pageNow = 0;

export async function renderPost(posts, page, listGenres) {
    try {
        const { page, results, total_pages, total_results } = posts.data;
        total_pgs = total_pages;
        pageNow = page;
        const arrayMovies = results.length > 9 ? results.slice(0, 9) : results;
        const promises = arrayMovies.map(async ({ poster_path, id, title, genre_ids, release_date, vote_average }) => {
            // Genres list charge
            const genres = await varDOM.genresList(genre_ids, listGenres).map((elemento) => {
                return ' ' + elemento;
            });
            // Delimitation of the list of genres and date
            const genresDel = genres.length > 2 ? `${genres.slice(0, 2)}, Others` : genres;
            const date_year = release_date != undefined ? release_date.slice(0, 4) : '2023';

            const poster = poster_path === null ? varDOM.defaultPoster : `https://image.tmdb.org/t/p/w500${poster_path}`;
            let genr = "";
            let cont = 0;
            for (const genre of genres) {
                genr += genre;
                cont += 1;
                if(cont == 3 || cont == genres.length){
                    break;
                }
                genr += ", ";
            }
            let year = [];            
            year[0] = undefined;
            
            if(release_date != undefined){
                year = release_date.split('-')
            }
            return `
            <figure class="movie-card" id="movie-detail">
                <a class="poster-large" data-id="${id}" href="#">
                    <img id="image" class='gallery__image' src="${poster}" alt="${title}" loading="lazy" />
                </a>
                <figcaption class="info">
                    <h3 class="card-movie-title">${title.toUpperCase()}</h3>
                    <div class="info-items">
                        <p class="info-item">
                            ${genresDel}
                        </p>
                        <p class="info-item">
                            | ${date_year}
                        </p>
                        <p class="info-item">
                            ${vote_average.toFixed(1)}
                        </p>
                    </div>

                 </figcaption>
            </figure>`
        });
        const markup = await Promise.all(promises);
        varDOM.filmsRender.innerHTML = markup.join(' ');

    }
    catch {
        return
    }
}

export function printCard(results){
    let insertCard = "";

    const baseImageUrl = 'https://image.tmdb.org/t/p/'
    let genres = getGenre(results.genres);
    let year = results.release_date.split('-');
   
    insertCard = `
                    <figure class="movie-card" id="movie-detail">
                        <a class="poster-large" data-id="" href="#">
                            <img class='gallery__image' src="${baseImageUrl}w300${results.poster_path}" alt="${results.tittle}" loading="lazy"  data-id="${results.id}"/>
                        </a>
                        <figcaption class="info">
                            <h3 class="card-movie-title">${
                              results.original_title
                            }</h3>
                            <div class="info-items">
                                <p class="info-item">
                                    ${genres}
                                </p>
                                <p class="info-item">
                                   |  ${year[0]}
                                </p>
                                <p class="info-item">
                                    ${results.vote_average.toFixed(1)}
                                </p>
                            </div>

                        </figcaption>
                    </figure>`;
    

    return insertCard;
}