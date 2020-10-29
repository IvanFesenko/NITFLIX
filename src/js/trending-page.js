import apiService from './APIservice';
import refs from './refs';
import trendingTemplate from '../templates/trendingTemplate.hbs';

function generateTrendingList() {
  apiService
    .getTrending()
    .then(({ data }) => data.results)
    .then(res => {
      //make fullImagePath

      console.log(res);
      res = res.map(item => {
        item.backdrop_path = apiService.makeImagePath(item.backdrop_path, 5);
        item.poster_path = apiService.makeImagePath(item.poster_path, 4);

        return item;
      });

      //make markup
      const markup = trendingTemplate(res);
      refs.movieContainer.insertAdjacentHTML('beforeend', markup);
    });
}

generateTrendingList();
