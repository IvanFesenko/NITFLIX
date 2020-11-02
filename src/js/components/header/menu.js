import refs from '../../refs';
import MoviesCards from '../MoviesCards';
import renderMarkup from '../../renderMarkup';
import clearMovieList from '../../services/clearMovieList';
import clearContainers from '../../services/clearContainers'
import { onOpenModalRegistration } from '../../modalRegistration';
import { currentUser } from '../../firebase';

import { getWatchedMovies, getQueuedMovies } from '../../userLists';

const {
  myListRef,
  listWatchedRef,
  listQueueRef,
  mainTitle,
  paginationWrp,
} = refs;

function onMyListClick(e) {
  e.preventDefault();
}

function onWatchedClick(e) {
  e.preventDefault();

  if (!currentUser()) {
    onOpenModalRegistration();
  } else {
    getWatchedMovies().then(res => {
      clearContainers();
      mainTitle.textContent = `Watched list`;
      renderMarkup(res, MoviesCards, refs.movieContainer);
      paginationWrp.style = 'display:none';
    });
  }
}

function onQueueClick(e) {
  e.preventDefault();

  if (!currentUser()) {
    onOpenModalRegistration();
  } else {
    getQueuedMovies().then(res => {
      clearContainers();
      mainTitle.textContent = `Queue list`;
      renderMarkup(res, MoviesCards, refs.movieContainer);
      paginationWrp.style = 'display:none';
    });
  }
}

myListRef.addEventListener('click', onMyListClick);
listWatchedRef.addEventListener('click', onWatchedClick);
listQueueRef.addEventListener('click', onQueueClick);
