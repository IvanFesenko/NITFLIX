import { parse } from 'querystring';
import apiService from './APIservice';
import { pagination, buildPage } from './pagination';
import refs from './refs';
import { isDefaultLanguage, getLanguageCode } from './language';

const generateTrendingList = () => {
  const lang = getLanguageCode();

  apiService.getTrending(lang).then(({ data }) => {
    refs.mainTitle.textContent = isDefaultLanguage()
      ? `Most popular movies`
      : `Популярное`;

    buildPage(data.results, data.page, data.total_pages);
    pagination(data.total_pages, data.page);
    return data.results;
  });
};

//generateTrendingList();
export default generateTrendingList;
