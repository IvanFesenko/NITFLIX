import { parse } from 'querystring';
import apiService from './APIservice';
import { pagination, buildPage } from './pagination';

const generateTrendingList = () => {
  apiService.getTrending().then(({ data }) => {
    buildPage(data.results, data.page, data.total_pages);
    pagination(data.total_pages, data.page);
    return data.results;
  });
};

generateTrendingList();
