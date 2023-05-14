export const varDOM = {
    movieName: document.getElementById('text-search'),
    onSearchBtn: document.getElementById('btn-search'),
    filmsRender: document.getElementById('films'),
    defaultPoster: "https://firebasestorage.googleapis.com/v0/b/filmoteca-c42e2.appspot.com/o/images%2Fdefault-opt.jpg?alt=media&token=8d34f416-268a-4f03-a309-841d27ec0d59",
    genresList: function (ids_movie, movieListGenres) {
    const genres = movieListGenres.filter(movie => ids_movie.includes(movie.id)).map(genre => genre.name);
    return genres;
    },
    modalContainer: document.querySelector('#myModal'),
    modalP: document.querySelector('p'),
    modalCloseBtn: document.querySelector('.close'),
    modalImgPoster: document.querySelector('.modal-block-poster'),
    modalTitle: document.querySelector('.modal-block__title'),
    modalInfoValues: document.querySelector('.film-info__values'),
    modalDescMovie: document.querySelector('.description-text'),
    modalWatchedBtn: document.getElementById('watch-button'),
    modalQueueBtn: document.getElementById('queue-button')
};