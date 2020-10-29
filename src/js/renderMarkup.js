import refs from './refs';
import MoviesCards from './components/MovieCard';

export const renderMarkup = res => {
  console.log(res);
  const markup = MoviesCards(res);
  console.log(markup);
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
};
