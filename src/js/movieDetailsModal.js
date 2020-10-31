import refs from './refs';
import apiService from './APIservice';
import MovieDetailsCard from './components/MovieDetailsCard';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
import moviChangeBackground from './components/header/MoviChangeBackground';

moviChangeBackground('navigation');

function addBackgroundForModal(url) {
  const content = document.querySelector('.movie-modal__content');
  content.style.backgroundImage = `linear-gradient(180deg, rgba(255,255,255,0.36878501400560226) 10%, rgba(255,255,255,0.8477766106442577) 25%, rgba(255,255,255,1) 40%), url(
 "${url}")`;
  content.style.backgroundPosition = 'top';
  content.style.backgroundRepeat = 'no-repeat';
  content.style.backgroundSize = '100%';
}

const getTrailers = id => {
  return apiService
    .getTrailer(id)
    .then(({ data }) => data)
    .then(({ results }) => {
      console.log(results);
      if (results.length) {
        const trailers = results
          .map(({ key, name }) => {
            return `
          <li class="movie-trailers-list__item">
            <h4 class="movie-trailers-list__item-name">${name}</h4>
            <iframe 
              class="movie-trailers-list__item-trailer""
              
              src="https://www.youtube.com/embed/${key}"
              frameborder="0"
              allowfullscreen>
            </iframe>
          </li>
          `;
          })
          .join(' ');
        const movieTrailers = document.querySelector('.movie-trailers-list');
        const movieTrailersTitle = document.querySelector(
          '.movie-trailers__title',
        );

        movieTrailersTitle.style = 'display:block';
        movieTrailers.insertAdjacentHTML('beforeend', trailers);
        console.log(trailers);
      }
    });
};

const getMovieDetails = id => {
  const size = screenSize();
  return apiService
    .getMovieInfo(id)
    .then(({ data }) => data)
    .then(res => {
      res.backdrop_path = apiService.makeImagePath(res.backdrop_path, size);
      res.poster_path = apiService.makeImagePath(res.poster_path, size);
      renderMarkup(res, MovieDetailsCard, refs.body);

      document.querySelector('.js-movie-modal').classList.add('is-open');

      addRefsForModal();
      addBackgroundForModal(res.backdrop_path);
    });
};

async function onOpenMovieModal(id) {
  await getMovieDetails(id);
  await getTrailers(id);
}

function addRefsForModal() {
  const closeBtnRef = document.getElementById('close-movie-modal');
  const backdrop = document.querySelector('.js-movie-modal__overlay');

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

  refs.modalBlurContainer.classList.remove('js-blur-on');
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
    refs.modalBlurContainer.classList.add('js-blur-on');
    document.querySelector('html').style = 'overflow:hidden';
  }
}

refs.movieContainer.addEventListener('click', handleOpenModal);

<<<<<<< HEAD
// onOpenMovieModal(590223);
=======
//onOpenMovieModal(590223);
>>>>>>> 8eaacd4d73b9a1fa58d57a322e5ff3bb2dde30ef
