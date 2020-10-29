import refs from './refs';
import apiService from './APIservice';
import movieModalTempl from '../templates/movie-modal.hbs';

function handleCloseModal() {
  onCloseMovieModal();
}

function handleOpenModal() {
  onOpenMovieModal();
  refs.modalBlurContainer.classList.add('js-blur-on');
}

function onOpenMovieModal() {
  apiService
    .getMovieInfo(531219)
    .then(({ data }) => data)
    .then(res => {
      //make image full path
      res.backdrop_path = apiService.makeImagePath(res.backdrop_path, 5);
      res.poster_path = apiService.makeImagePath(res.poster_path, 3);

      //make markup
      const markup = movieModalTempl(res);
      refs.body.insertAdjacentHTML('beforeend', markup);

      document.querySelector('.js-movie-modal').classList.add('is-open');

      //add ref for close modal
      addRefsForModal();
    });
}

function addRefsForModal() {
  const closeBtnRef = document.getElementById('close-movie-modal');
  const backdrop = document.querySelector('.js-movie-modal__overlay');

  backdrop.addEventListener('click', onClickOnBackDrop);
  closeBtnRef.addEventListener('click', handleCloseModal);
}

function onClickOnBackDrop() {
  if (event.target === event.currentTarget) {
    onCloseMovieModal();
  }
}

function removeEventListenerFromModal() {
  document
    .getElementById('close-movie-modal')
    .removeEventListener('click', handleCloseModal);
  document.querySelector('click', onClickOnBackDrop);
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
}

refs.movieContainer.addEventListener('click', handleOpenModal);
