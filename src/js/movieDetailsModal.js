import refs from './refs';
import apiService from './APIservice';
import MovieDetailsCard from './components/MovieDetailsCard';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
import movieChangeBackground from './components/header/MovieChangeBackground';
import debounce from 'lodash-es/debounce';
import {
  addMovieToWatched,
  addMovieToQueue,
  movieListed,
  deleteFromWatched,
  deleteFromQueue,
} from './userLists';
import { currentUser } from './firebase';
import { onOpenModalRegistration } from './modalRegistration';

movieChangeBackground('navigation');

function addBackgroundForModal(url) {
  const content = document.querySelector('.movie-modal__content');
  content.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.36878501400560226) 10%, rgba(255,255,255,0.8477766106442577) 25%, rgba(255,255,255,1) 40%), url(
 "${url}")`;
  content.style.backgroundPosition = 'top';
  content.style.backgroundRepeat = 'no-repeat';
  content.style.backgroundSize = '100%';
}

//adds to user lists
function onClickAddToWatched(e) {
  e.preventDefault();
  if (!currentUser()) {
    onOpenModalRegistration();
    return;
  }
  const addToWatchedBtn = document.querySelector('.movie-modal__watched-btn');
  const notifyWatched = document.querySelector('#notify__watched');
  const dataAtr = document.querySelector('#dataAtr');
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
  } = dataAtr.dataset;
  if (addToWatchedBtn.dataset.active === 'true') {
    deleteFromWatched(id);
    notifyWatched.textContent = 'Add to watched';
    addToWatchedBtn.dataset.active = 'false';
    addToWatchedBtn.classList.remove('movie-modal__btn--red');
  } else if (addToWatchedBtn.dataset.active === 'false') {
    const movie = { id, title, poster_path, release_date, vote_average };
    addMovieToWatched(movie);
    notifyWatched.textContent = 'Delete from watched';
    addToWatchedBtn.dataset.active = 'true';
    addToWatchedBtn.classList.add('movie-modal__btn--red');
  }
}

function onClickAddToQueueList(e) {
  e.preventDefault();
  if (!currentUser()) {
    onOpenModalRegistration();
    return;
  }
  const addToQueueBtn = document.querySelector('.movie-modal__queue-btn');
  const notifyQueue = document.querySelector('#notify__queue');
  const dataAtr = document.querySelector('#dataAtr');
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
  } = dataAtr.dataset;
  if (addToQueueBtn.dataset.active === 'true') {
    deleteFromQueue(id);
    notifyQueue.textContent = 'Add to queue';
    addToQueueBtn.dataset.active = 'false';
    addToQueueBtn.classList.remove('movie-modal__btn--red');
  } else if (addToQueueBtn.dataset.active === 'false') {
    const movie = { id, title, poster_path, release_date, vote_average };
    addMovieToQueue(movie);
    notifyQueue.textContent = 'Delete from queue';
    addToQueueBtn.dataset.active = 'true';
    addToQueueBtn.classList.add('movie-modal__btn--red');
  }
}

//adds to user lists END

const getTrailers = id => {
  return apiService
    .getTrailer(id)
    .then(({ data }) => data)
    .then(({ results }) => {
      if (results.length) {
        const trailers = results
          .map(({ key, name }) => {
            return `
          <li class="movie-trailers-list__item">
            
            <iframe 
              class="movie-trailers-list__item-trailer""
              src="https://www.youtube.com/embed/${key}"
              frameborder="0"
              allowfullscreen>
            </iframe>
            <h4 class="movie-trailers-list__item-name">${name}</h4>
          </li>
          `;
          })
          .join(' ');

        const movieTrailers = document.querySelector('.movie-trailers-list');
        const movieTrailersTitle = document.querySelector(
          '.movie-trailers__title',
        );
        const movieModalTrailersBtn = document.querySelector(
          '.movie-modal__trailers-btn',
        );

        const handleTrailersBtnClick = () => {
          movieTrailers.scrollIntoView({ block: 'start', behavior: 'smooth' });
        };

        // movieModalTrailersBtn.style = 'display:block';
        // movieTrailersTitle.style = 'display:block';
        movieTrailers.insertAdjacentHTML('beforeend', trailers);

        movieModalTrailersBtn.addEventListener('click', handleTrailersBtnClick);
      }
    });
};

const getMovieDetails = (id, listed) => {
  const size = screenSize();

  return apiService
    .getMovieInfo(id)
    .then(({ data }) => data)
    .then(res => {
      res.backdrop_path = apiService.makeImagePath(res.backdrop_path, size);
      res.poster_path = apiService.makeImagePath(res.poster_path, size);
      const _res = { ...res, ...listed };
      renderMarkup(_res, MovieDetailsCard, refs.body);

      const modal = document.querySelector('.js-movie-modal');
      const movieContent = modal.querySelector('.movie-modal__content');
      const movieModalScrollUp = document.querySelector(
        '.movie-modal__scrollUp',
      );

      const handleScrollUpBtnClick = () => {
        movieContent.scrollTop = 0;
      };

      modal.classList.add('is-open');

      const scrollFunction = () => {
        if (movieContent.scrollTop > 20) {
          movieModalScrollUp.style = 'opacity:1';

          console.log('show');
        } else {
          movieModalScrollUp.style = 'opacity:0';
          console.log('hide');
        }
      };

      movieContent.addEventListener('scroll', debounce(scrollFunction, 150));
      movieModalScrollUp.addEventListener('click', handleScrollUpBtnClick);
      addRefsForModal();
      addBackgroundForModal(res.backdrop_path);
    });
};

async function onOpenMovieModal(id) {
  const listed = await movieListed(id);
  await getMovieDetails(id, listed);
  await getTrailers(id);
}

function addRefsForModal() {
  const closeBtnRef = document.getElementById('close-movie-modal');
  const backdrop = document.querySelector('.js-movie-modal__overlay');
  //Add to user list
  const addToWatchedBtn = document.querySelector('.movie-modal__watched-btn');
  const addToQueueBtn = document.querySelector('.movie-modal__queue-btn');
  addToWatchedBtn.addEventListener('click', onClickAddToWatched);
  addToQueueBtn.addEventListener('click', onClickAddToQueueList);
  //Add to user list END

  backdrop.addEventListener('click', onClickOnBackDrop);
  closeBtnRef.addEventListener('click', handleCloseModal);

  window.addEventListener('keydown', onPressEsc);
}

function onClickOnBackDrop(event) {
  if (event.target === event.currentTarget) {
    onCloseMovieModal();
  }
}

function removeEventListenerFromModal() {
  document
    .getElementById('close-movie-modal')
    .removeEventListener('click', handleCloseModal);
  document.querySelector('click', onClickOnBackDrop);
  window.removeEventListener('keydown', onPressEsc);
  //Add to user list
  const addToWatchedBtn = document.querySelector('.movie-modal__watched-btn');
  const addToQueueBtn = document.querySelector('.movie-modal__queue-btn');
  addToWatchedBtn.removeEventListener('click', onClickAddToWatched);
  addToQueueBtn.removeEventListener('click', onClickAddToQueueList);
  //Add to user list END
}

function removeModalFromHtml() {
  const modal = document.querySelector('.js-movie-modal');
  refs.body.removeChild(modal);
}

function onCloseMovieModal() {
  const modal = document.querySelector('.js-movie-modal');
  modal.classList.remove('is-open');

  //removeEventListener
  removeEventListenerFromModal();

  //remove modal from html
  removeModalFromHtml();

  refs.modalBlurContainer.classList.remove('blur-on');
  document.querySelector('html').style = ' overflow-x: hidden;';
}

function onPressEsc(event) {
  if (event.key === 'Escape') {
    onCloseMovieModal();
  }
}

function handleCloseModal() {
  onCloseMovieModal();
}

function handleOpenModal(event) {
  const id = event.target.dataset.id;
  if (id) {
    onOpenMovieModal(id);
    refs.modalBlurContainer.classList.add('blur-on');
    document.querySelector('html').style = 'overflow:hidden';
  }
}

refs.movieContainer.addEventListener('click', handleOpenModal);

//onOpenMovieModal(590223);
