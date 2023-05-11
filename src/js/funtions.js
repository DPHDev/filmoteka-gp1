export function printCard(results) {
  let insertCard = '';

  const baseImageUrl = 'https://image.tmdb.org/t/p/';
  for (const result of results) {
    console.log(result.id);
    insertCard += `<div class="gallery__card">
                          <img class="gallery__img" src="${baseImageUrl}w300${result.poster_path}" data-id="${result.id}" alt="" loading="lazy" />
                          <div class="gallery__info">
                            <h2 class="gallery__title">${result.original_title}</h2>
                            <p class="gallery__text">${result.release_date}</p>                         
                          </div>
                       </div>`;
  }
  return insertCard;
}

export function deletechildrens(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
