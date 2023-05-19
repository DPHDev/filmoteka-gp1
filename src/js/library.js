import {
    setQueue,
    setWatched,
    getQueue,
    getWatched,
    getGenre,
    deletechildrens,  
    searchId 
} from './localStorage';

import { getMovie } from "../js/request-api";
import { printCard } from "../js/renderPost";
import { varDOM } from "./var-selector-dom";
import { scrollTop } from './scroll-top';
const{modalContainer, modalQueueBtn, modalWatchedBtn, modalCloseBtn}=varDOM;
import { detailsMovieValues } from "./modal-movie-details";
import { theme } from './theme-dark';

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
scrollTopBtn = document.querySelector('.back-to-top');

    let ids = getWatched();  
  //   buttons.style.display = 'block';
    if (ids === null) {
      filmsRender.innerHTML = `Oops! Your "watched" library is empty!`;
      clearWatched.style.display = "none";
      clearQueue.style.display = "none";
      buttonWatchet.focus();
    }else{      
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
  
  clearWatched.addEventListener('click', e => {
    localStorage.removeItem('Watched');
    deletechildrens(filmsRender);
    clearWatched.style.display = 'none';
    location.reload();
  });
  
  clearQueue.addEventListener('click', e => {
    localStorage.removeItem('Queue');
    deletechildrens(filmsRender);
    clearQueue.style.display = 'none';
    location.reload();
  }); 
  
  filmsRender.addEventListener('click', (e)=>{
      e.preventDefault();      
      modalContainer.style.display='block';
      detailsMovieValues(e.target.dataset.id);     
      modalWatchedBtn.textContent = "ADD TO WATCHED";
      modalQueueBtn.textContent = "ADD TO QUEUE";
      if(searchId(e.target.dataset.id, 'Watched') == true){
        modalWatchedBtn.textContent = "REMOVE FROM WATCHED";
      }
      if(searchId(e.target.dataset.id, 'Queue')){
        modalQueueBtn.textContent = "REMOVE FROM QUEUE";
      } 
  });

  
modalQueueBtn.addEventListener('click', e => {
  e.preventDefault();
  if(modalQueueBtn.textContent == "ADD TO QUEUE"){
    setQueue(modalQueueBtn.value);
    modalQueueBtn.textContent = 'REMOVE FROM QUEUE'
  }else{
    removeQueue(modalQueueBtn.value);
    modalQueueBtn.textContent = 'ADD TO QUEUE'
    console.log('remove');
  }

  location.reload();
  
});

modalWatchedBtn.addEventListener('click', e => {
  e.preventDefault();
  if(modalWatchedBtn.textContent == "ADD TO WATCHED"){
    setWatched(modalWatchedBtn.value);
    modalWatchedBtn.textContent = 'REMOVE FROM WATCHED'
  }else{
    removeWatched(modalWatchedBtn.value);
    modalWatchedBtn.textContent = 'ADD TO WATCHED'
    console.log('remove');
  } 
  location.reload();
});

  modalCloseBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      modalContainer.style.display='none';
  });


// Scroll button to top
window.addEventListener('scroll', scrollTop);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});