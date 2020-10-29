import apiService from './APIservice';
import refs from './refs';
import moviesListTemplate from '../templates/moviesListTemplate.hbs';

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
      //make fullImagePath
      res = res.map(item => {
        item.poster_path = apiService.makeImagePath(item.poster_path, size);
        return item;
      });
      makeMarkup(res);
    });
}

generateTrendingList();
