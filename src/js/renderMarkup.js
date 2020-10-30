import refs from './refs';
import MoviesCards from './components/MovieCard';

export const renderMarkup = res => {
  console.log(res);
  const markup = MoviesCards(res);
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
};
