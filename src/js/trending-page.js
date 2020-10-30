import apiService from './APIservice';
import { renderMarkup } from './renderMarkup';
import screenSize from './services/screenSize';

function generateTrendingList() {
  const size = screenSize();
  console.log(screenSize());
  apiService
    .getTrending()
    .then(({ data }) => data.results)
    .then(res => {
      res = res.map(item => {
        item.backdrop_path = apiService.makeImagePath(item.backdrop_path, size);
        return item;
      });
      renderMarkup(res);
    });
}

generateTrendingList();
