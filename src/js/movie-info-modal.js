import refs from './refs';
import apiService from './APIservice';
import movieModalTempl from '../templates/movie-modal.hbs';

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

      //close btn ref
      const closeBtnRef = document.getElementById('close-movie-modal');
      closeBtnRef.addEventListener('click', handleCloseModal);
    });
}

function handleCloseModal() {
  onCloseMovieModal();
}

function onCloseMovieModal() {
  const modal = document.querySelector('.js-movie-modal');
  modal.classList.remove('is-open');
  document
    .getElementById('close-movie-modal')
    .removeEventListener('click', handleCloseModal);
}

refs.movieContainer.addEventListener('click', event => {
  onOpenMovieModal();
});
