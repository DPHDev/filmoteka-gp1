// import genresList from './genres';
import { varDOM } from "./var-selector-dom";

let count = 0;

export async function renderPost(posts, page, listGenres) {
    try {
        const { page, results, total_pages, total_results } = posts.data;
        const promises = results.map(async ({ poster_path, id, title, genre_ids, release_date, vote_average }) => {
            const genres = await varDOM.genresList(genre_ids, listGenres);
            const poster = poster_path === null ? varDOM.defaultPoster : `https://image.tmdb.org/t/p/w500${poster_path}`;
            
            return `
            <figure class="movie-card" id="movie-detail">
                <a class="poster-large" data-id="${id}" href="#">
                    <img class='gallery__image' src="${poster}" alt="${title}" loading="lazy" />
                </a>
                <figcaption class="info">
                    <h3 class="card-movie-title">${title}</h3>
                    <div class="info-items">
                        <p class="info-item">
                            ${genres}
                        </p>
                        <p class="info-item">
                            ${release_date}
                        </p>
                        <p class="info-item">
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
};