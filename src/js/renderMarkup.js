import refs from './refs';
import moviesListTemplate from '../templates/moviesListTemplate.hbs';

export const renderMarkup = res => {
  const markup = moviesListTemplate(res);
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
};
