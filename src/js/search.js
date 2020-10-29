import refs from './refs';
import apiService from './APIservice';
import { renderMarkup } from './renderMarkup';

const { searchForm, searchFormInput, movieContainer, mainTitle } = refs;

const onSearch = e => {
  e.preventDefault();

  const value = searchFormInput.value.trim();
  console.log(value);
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
              5,
            );
            item.poster_path = apiService.makeImagePath(item.poster_path, 4);
            return item;
          });
          renderMarkup(results);
        } else {
          mainTitle.textContent =
            'No results were found for your search. Try again!';
        }
      });
  }
  searchFormInput.value = '';
};

searchForm.addEventListener('submit', onSearch);
