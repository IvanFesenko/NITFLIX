import apiService from './APIservice';
import { renderMarkup } from './renderMarkup';

function makeMarkup(res) {
  const markup = moviesListTemplate(res);
  refs.movieContainer.insertAdjacentHTML('beforeend', markup);
}

function generateTrendingList() {
  const size = apiService.screenSize();

  apiService
    .getTrending()
    .then(({ data }) => data.results)
    .then(res => {
      res = res.map(item => {
        item.poster_path = apiService.makeImagePath(item.poster_path, size);
        return item;
      });
      renderMarkup(res);
    });
}

generateTrendingList();
