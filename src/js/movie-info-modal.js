import refs from './refs';
import conf from './api-conf';

import movieModalTempl from '../templates/movie-modal.hbs';
import fetchMovieInfo from './movie-info-api';

function onOpenMovieModal() {
  const data = fetchMovieInfo(531219);
  console.log(data);
  // fetchMovieInfo(531219).then(res => {
  //   //make image full path
  //   res.backdrop_path = conf.makeImagePath(res.backdrop_path, 5);
  //   res.poster_path = conf.makeImagePath(res.poster_path, 3);

  //   //make markup
  //   console.log(res);
  //   const markup = movieModalTempl(res);
  //   refs.body.insertAdjacentHTML('beforeend', markup);

  //   document.querySelector('.js-movie-modal').classList.add('is-open');
  // });
}

function onCloseMovieModal() {
  const modal = document.querySelector('.js-movie-modal');
  modal.classList.remove('is-open');
}

refs.trendingContainer.addEventListener('click', event => {
  onOpenMovieModal();
});
