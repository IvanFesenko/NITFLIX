import refs from './refs';
import apiService from './APIservice';
import moviesListTemplate from '../templates/moviesListTemplate.hbs';

const { searchForm, searchFormInput, trendingContainer, mainTitle } = refs;

const renderMoviesByQuery = results => {
  const markup = moviesListTemplate(results);
  trendingContainer.insertAdjacentHTML('beforeend', markup);
};

const onSearch = e => {
  e.preventDefault();

  const value = searchFormInput.value.trim();
  console.log(value);
  if (value) {
    trendingContainer.innerHTML = '';
    apiService
      .getSearchResult(value)
      .then(({ data }) => data.results)
      .then(results => {
        if (results.length) {
          results = results.map(item => {
            item.backdrop_path = apiService.makeImagePath(
              item.backdrop_path,
              5,
            );
            item.poster_path = apiService.makeImagePath(item.poster_path, 4);
            return item;
          });
          renderMoviesByQuery(results);
        } else {
          mainTitle.textContent =
            'No results were found for your search. Try again!';
        }
      });
  }
  searchFormInput.value = '';
};

searchForm.addEventListener('submit', onSearch);
