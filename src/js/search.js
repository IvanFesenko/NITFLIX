import refs from './refs';
import apiService from './APIservice';
import { pagination, buildPage } from './pagination';
const {
  searchForm,
  searchFormInput,
  movieContainer,
  mainTitle,
  paginationWrp,
} = refs;

const onSearch = e => {
  e.preventDefault();
  const value = searchFormInput.value.trim();
  if (value) {
    movieContainer.innerHTML = '';
    apiService.getSearchResult(value).then(({ data }) => {
      if (data.results.length) {
        buildPage(data.results, data.page, data.total_pages);
        pagination(data.total_pages, data.page);
        mainTitle.textContent = `Results for ${value}`;
        const main = document.querySelector('.main');
        main.removeAttribute('style');
      } else {
        mainTitle.textContent = `No results were found for ${value}. Try again!`;
        const main = document.querySelector('.main');
        main.style.height = '80vh';
        paginationWrp.style = 'display:none';
      }
      return data.results;
    });
  }
  searchFormInput.value = '';
};

searchForm.addEventListener('submit', onSearch);
