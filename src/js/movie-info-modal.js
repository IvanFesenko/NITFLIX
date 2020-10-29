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
      console.log(res);
      const markup = movieModalTempl(res);
      refs.body.insertAdjacentHTML('beforeend', markup);

      document.querySelector('.js-movie-modal').classList.add('is-open');
    });
}

window.addEventListener('click', event => {
  console.log(event.target);
});

onOpenMovieModal();
