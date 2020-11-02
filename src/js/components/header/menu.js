import refs from '../../refs';
import MoviesCards from '../MoviesCards';
import renderMarkup from '../../renderMarkup';
import clearMovieList from '../../services/clearMovieList';

import { getWatchedMovies, getQueuedMovies } from '../../userLists';

const { myListRef, listWatchedRef, listQueueRef, mainTitle } = refs;

function onMyListClick(e) {
  e.preventDefault();
}

function onWatchedClick(e) {
  e.preventDefault();
  getWatchedMovies().then(res => {
    clearMovieList();
    mainTitle.textContent = `Watched list`;
    renderMarkup(res, MoviesCards, refs.movieContainer);
  });
}

function onQueueClick(e) {
  e.preventDefault();
  getQueuedMovies().then(res => {
    clearMovieList();
    mainTitle.textContent = `Queue list`;
    renderMarkup(res, MoviesCards, refs.movieContainer);
  });
}

myListRef.addEventListener('click', onMyListClick);
listWatchedRef.addEventListener('click', onWatchedClick);
listQueueRef.addEventListener('click', onQueueClick);
