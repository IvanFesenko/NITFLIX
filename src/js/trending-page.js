import apiService from './APIservice';
import refs from './refs';
import moviesListTemplate from '../templates/moviesListTemplate.hbs';

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
      //make fullImagePath
      res = res.map(item => {
        item.poster_path = apiService.makeImagePath(item.poster_path, size);
        return item;
      });
      makeMarkup(res);
    });
}

generateTrendingList();
