// import genresList from './genres';
import { varDOM } from "./var-selector-dom";
import { getGenre } from "./localStorage";

let count = 0;

export async function renderPost(posts, page, listGenres) {
    try {
        const { page, results, total_pages, total_results } = posts.data;
        const promises = results.map(async ({ poster_path, id, title, genre_ids, release_date, vote_average }) => {
            
            const genres = await varDOM.genresList(genre_ids, listGenres);
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
                    <img class='gallery__image' src="${poster}" alt="${title}" loading="lazy" />
                </a>
                <figcaption class="info">
                    <h3 class="card-movie-title">${title}</h3>
                    <div class="info-items">
                        <p class="info-item">
                            ${genr}
                        </p>
                        <p class="info-item ">
                           |  ${year[0]}
                        </p>
                        <p class="info-item orange">
                            ${vote_average}
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
   
    insertCard =`
                    <figure class="movie-card" id="movie-detail">
                        <a class="poster-large" data-id="" href="#">
                            <img class='gallery__image' src="${baseImageUrl}w300${results.poster_path}" alt="${results.tittle}" loading="lazy" />
                        </a>
                        <figcaption class="info">
                            <h3 class="card-movie-title">${results.original_title}</h3>
                            <div class="info-items">
                                <p class="info-item">
                                    ${genres}
                                </p>
                                <p class="info-item">
                                   |  ${year[0]}
                                </p>
                                <p class="info-item orange">
                                    ${results.vote_average}
                                </p>
                            </div>

                        </figcaption>
                    </figure>`
    

    return insertCard;
}