import apiService from './APIservice';
import { renderMarkup } from './renderMarkup';

function screenSize() {
  const screenSize = document.body.clientWidth;

  if (screenSize < 768) {
    return 4;
  } else if (screenSize < 1024) {
    return 5;
  } else {
    return 6;
  }
}

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
