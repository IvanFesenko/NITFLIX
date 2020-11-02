import refs from '../refs';

const clearMovieList = () => {
  refs.movieContainer.innerHTML = '';
  refs.cleanBoxWrp.innerHTML = '';
};

export default clearMovieList;
