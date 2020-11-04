import refs from './refs';
import apiService from './APIservice';
import { pagination, buildPage } from './pagination';
import clearContainers from './services/clearContainers';
import { isDefaultLanguage, getLanguageCode } from './language';

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
    clearContainers();
    const lang = getLanguageCode();
    apiService.getSearchResult(value, lang).then(({ data }) => {
      if (data.results.length) {
        buildPage(data.results, data.page, data.total_pages);
        pagination(data.total_pages, data.page);
        mainTitle.textContent = isDefaultLanguage()
          ? `Results for "${value}"`
          : `Результат поиска по: "${value}"`;
        const main = document.querySelector('.main');
        main.removeAttribute('style');
      } else {
        mainTitle.textContent = isDefaultLanguage()
          ? `No results were found for "${value}". Try again!`
          : `По запросу: "${value}" ничего не найдено. Попробуйте снова!`;
        const main = document.querySelector('.main');
        main.style.height = '80vh';
      }
      return data.results;
    });
  }
  searchFormInput.value = '';
};

searchForm.addEventListener('submit', onSearch);
