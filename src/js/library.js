import {
    setQueue,
    setWatched,
    getQueue,
    getWatched,
    getGenre,
    deletechildrens,    
} from './localStorage';

import { getMovie } from "../js/request-api";
import { printCard } from "../js/renderPost";
import { varDOM } from "./var-selector-dom";
const{modalContainer, modalQueueBtn, modalWatchedBtn, modalCloseBtn}=varDOM;
import { detailsMovieValues } from "./modal-movie-details";

filmsRender = document.getElementById('films');
buttonWatchet = document.getElementById('buttonWatchet');
buttonQueue = document.getElementById('buttonQueue')
clearWatched = document.getElementById('clearWatched');
clearQueue = document.getElementById('clearQueue');
image = document.getElementById('image');
removeWatche = document.getElementById('removeWatche');
removeQueue = document.getElementById('removeQweue');
addWatched = document.getElementById('watch-button');
addQueue = document.getElementById('queue-button');

    let ids = getWatched();  
  //   buttons.style.display = 'block';
    if (ids === null) {
      filmsRender.innerHTML = `Oops! Your "watched" library is empty!`;
      clearWatched.style.display = "none";
      clearQueue.style.display = "none";
      buttonWatchet.focus();
    } else {
      buttonWatchet.focus();
      clearQueue.style.display = 'none';
      deletechildrens(filmsRender);
      if (ids.length === undefined) {
        getMovie(ids)
          .then(data => {
            filmsRender.insertAdjacentHTML('beforeend', printCard(data));
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        for (const id of ids) {
          getMovie(id)
            .then(data => {
              filmsRender.insertAdjacentHTML('beforeend', printCard(data));
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
 
  
  buttonWatchet.addEventListener('click', e => {
    buttonWatchet.focus();
    e.preventDefault();
    let ids = getWatched();
    clearQueue.style.display = 'none';
    if (ids === null) {
      filmsRender.innerHTML = `Oops! Your "watched" library is empty!`;
    } else {
      clearWatched.style.display = 'block';
      deletechildrens(filmsRender);
      if (ids.length === undefined) {
        getMovie(ids)
          .then(data => {
            filmsRender.insertAdjacentHTML('beforeend', printCard(data));
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        for (const id of ids) {
          getMovie(id)
            .then(data => {
              filmsRender.insertAdjacentHTML('beforeend', printCard(data));
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  });
  
  buttonQueue.addEventListener('click', e => {
    buttonQueue.focus();
    e.preventDefault();
    let ids = getQueue();
    clearWatched.style.display = 'none';
    if (ids === null) {
      filmsRender.innerHTML = `Oops! Your "Queue" library is empty!`;
    } else {
      clearQueue.style.display = 'block';
      deletechildrens(filmsRender);
      if (ids.length === undefined) {
        getMovie(ids)
          .then(data => {
            filmsRender.insertAdjacentHTML('beforeend', printCard(data));
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        for (const id of ids) {
          getMovie(id)
            .then(data => {
              filmsRender.insertAdjacentHTML('beforeend', printCard(data));
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    }
  });

  modalQueueBtn.addEventListener('click', e => {
    e.preventDefault();
    setQueue(modalQueueBtn.value);
  });
  
  modalWatchedBtn.addEventListener('click', e => {
    e.preventDefault();
    setWatched(modalWatchedBtn.value);
  });
  
  clearWatched.addEventListener('click', e => {
    localStorage.removeItem('Watched');
    deletechildrens(filmsRender);
    clearWatched.style.display = 'none';
  });
  
  clearQueue.addEventListener('click', e => {
    localStorage.removeItem('Queue');
    deletechildrens(filmsRender);
    clearQueue.style.display = 'none';
  }); 
  
  filmsRender.addEventListener('click', (e)=>{
      e.preventDefault();
      modalContainer.style.display='block';
      detailsMovieValues(e.target.dataset.id);      
  });

  modalCloseBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      modalContainer.style.display='none';
  });