import refs from './refs';

import movieModalTempl from '../templates/movie-modal.hbs';
import fetchMovieInfo from './movie-info-api';

function onOpenMovieModal() {
  fetchMovieInfo(531219).then(res => {
    console.log(res);
  });
}

window.addEventListener('click', event => {
  console.log(event.target);
});

onOpenMovieModal();
