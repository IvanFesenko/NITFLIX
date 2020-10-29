import apiService from './APIservice';
import { renderMarkup } from './renderMarkup';

function screenSize() {
  const sreenSize = document.body.clientWidth;

  if (screenSize < 768) {
    return 4;
  } else if (screenSize < 1024) {
    return 5;
  } else {
    return 6;
  }
}

function makeMarkup(res) {
  const markup = moviesListTemplate(res);
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
}

function generateTrendingList() {
  const size = screenSize();
  apiService
    .getTrending()
    .then(({ data }) => data.results)
    .then(res => {
<<<<<<< HEAD
=======
      //make fullImagePath
>>>>>>> dev
      res = res.map(item => {
        item.poster_path = apiService.makeImagePath(item.poster_path, size);
        return item;
      });
      renderMarkup(res);
    });
}

generateTrendingList();
