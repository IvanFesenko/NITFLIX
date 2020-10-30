import refs from './refs';
import MoviesCards from './components/MoviesCards';

export const renderMarkup = res => {
  const markup = MoviesCards(res);

  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
};
