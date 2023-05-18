import { getAPI } from './request-api';
import { total_pgs, renderPost, pageNow } from './renderPost';
import { varDOM } from './var-selector-dom';
import { detailsMovieValues } from './modal-movie-details';

export let varPages = {
  listPages: document.getElementById('pages-list'),
};

export function paginationButtons() {
  let markup = '';
  let limitInf = 3;
  let limitSup = total_pgs - 2;

  switch (true) {
    case pageNow <= limitInf:
      for (let i = 1; i <= 5; i++) {
        markup += `<li><button id="num-page-btn">${i}</button></li>`;
      }
      markup += `<li>...</li>
            <li><button id="num-page-btn">${total_pgs}</button></li>`;
      varPages.listPages.innerHTML = markup;
      break;
    case pageNow >= limitSup:
      markup += `<li><button id="num-page-btn">1</button></li><li>...</li>`;
      for (let i = pageNow-2; i <= total_pgs; i++) {
        markup += `<li><button id="num-page-btn">${i}</button></li>`;
      }
      varPages.listPages.innerHTML = markup;
      break;
    case pageNow > limitInf && pageNow < limitSup:
      markup += `<li><button id="num-page-btn">1</button></li><li>...</li>`;
      for (let i = pageNow - 2; i <= pageNow + 2; i++) {
        markup += `<li><button id="num-page-btn">${i}</button></li>`;
      }
      markup += `<li>...</li>
            <li><button id="num-page-btn">${total_pgs}</button></li>`;
      varPages.listPages.innerHTML = markup;
      break;
    default:
      console.log('Caso no reconocido');
      break;
  }
}

export function renderPerPagination() {
  document
    .getElementById('pg-contoler')
    .addEventListener('click', async event => {
      if (event.target && event.target.matches('#num-page-btn')) {
        const page = event.target;
        const mListGen = await getAPI.genres();
        const posts_per_page = await getAPI.movies(
          varDOM.movieName.value.trim(),
          page.textContent
        );
        await renderPost(posts_per_page, page, mListGen);
        paginationButtons();
        page.classList.add('pag-active');
        // Selection of element DOM
        const detail_movie = document.querySelectorAll('.movie-card');
        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
          const id_movie = movie.querySelector('a');
          movie.addEventListener('click', () => {
            varDOM.modalContainer.style.display = 'block';
            detailsMovieValues(id_movie.dataset.id);
          });
        });
      } else if (event.target && event.target.matches('#pg-advance-btn')) {
        const page_adv = pageNow + 1;
        const mListGen = await getAPI.genres();
        const posts_per_page = await getAPI.movies(
          varDOM.movieName.value.trim(),
          page_adv
        );
        await renderPost(posts_per_page, page_adv, mListGen);
        console.log(`page: ${pageNow}`);
        paginationButtons();
        // Selection of element DOM
        const detail_movie = document.querySelectorAll('.movie-card');
        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
          const id_movie = movie.querySelector('a');
          movie.addEventListener('click', () => {
            varDOM.modalContainer.style.display = 'block';
            detailsMovieValues(id_movie.dataset.id);
          });
        });
      } else if (event.target && event.target.matches('#pg-back-btn')) {
        const page_back = pageNow === 1 ? pageNow : pageNow - 1;
        const mListGen = await getAPI.genres();
        const posts_per_page = await getAPI.movies(
          varDOM.movieName.value.trim(),
          page_back
        );
        await renderPost(posts_per_page, page_back, mListGen);
        console.log(posts_per_page.data.total_results);
        paginationButtons();
        // Selection of element DOM
        const detail_movie = document.querySelectorAll('.movie-card');
        //Event click open movie details by class .movie-card
        detail_movie.forEach(movie => {
          const id_movie = movie.querySelector('a');
          movie.addEventListener('click', () => {
            varDOM.modalContainer.style.display = 'block';
            detailsMovieValues(id_movie.dataset.id);
          });
        });
      }
    });
}
