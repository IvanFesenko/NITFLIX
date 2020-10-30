import refs from './refs';
import apiService from './APIservice';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
const { searchForm, searchFormInput, movieContainer, mainTitle } = refs;
import MoviesCards from './components/MoviesCards';

const onSearch = e => {
  e.preventDefault();

  const value = searchFormInput.value.trim();
  const size = screenSize();
  if (value) {
    movieContainer.innerHTML = '';
    apiService
      .getSearchResult(value)
      .then(({ data }) => data.results)
      .then(results => {
        if (results.length) {
          results = results.map(item => {
            item.backdrop_path = apiService.makeImagePath(
              item.backdrop_path,
              size,
            );
            item.poster_path = apiService.makeImagePath(item.poster_path, size);
            return item;
          });
          renderMarkup(results, MoviesCards, refs.movieContainer);
        } else {
          mainTitle.textContent =
            'No results were found for your search. Try again!';
        }
      });
  }
  searchFormInput.value = '';
};

searchForm.addEventListener('submit', onSearch);
