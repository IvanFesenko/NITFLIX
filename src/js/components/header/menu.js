import refs from '../../refs';
import MoviesCards from '../MoviesCards';
import renderMarkup from '../../renderMarkup';
//import clearMovieList from '../../services/clearMovieList';
import clearContainers from '../../services/clearContainers';
import { onOpenModalRegistration } from '../../modalRegistration';
import { currentUser } from '../../firebase';
import { isDefaultLanguage } from '../../language';
import generateTrendingList from '../../trending-page';
import { getWatchedMovies, getQueuedMovies } from '../../userLists';

const {
  myListRef,
  listWatchedRef,
  listQueueRef,
  mainTitle,
  paginationWrp,
  logo,
  homeLink,
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
      mainTitle.textContent = isDefaultLanguage()
        ? `Watched list`
        : `Просмотренные`;
      renderMarkup(res, MoviesCards, refs.movieContainer);
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
      mainTitle.textContent = isDefaultLanguage()
        ? `Queue list`
        : `Для просмотра`;
      renderMarkup(res, MoviesCards, refs.movieContainer);
    });
  }
}

function onClickLogo(e) {
  e.preventDefault();
  clearContainers();
  generateTrendingList();
}

function onClickHome(e) {
  e.preventDefault();
  clearContainers();
  generateTrendingList();
}

myListRef.addEventListener('click', onMyListClick);
listWatchedRef.addEventListener('click', onWatchedClick);
listQueueRef.addEventListener('click', onQueueClick);
logo.addEventListener('click', onClickLogo);
homeLink.addEventListener('click', onClickHome);
