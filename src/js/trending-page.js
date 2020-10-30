import apiService from './APIservice';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
import MoviesCards from './components/MoviesCards';
import refs from './refs';

function generateTrendingList() {
  const size = screenSize();

  apiService
    .getTrending()
    .then(({ data }) => data.results)
    .then(res => {
      res = res.map(item => {
        item.poster_path = apiService.makeImagePath(item.poster_path, size);
        return item;
      });
      renderMarkup(res, MoviesCards, refs.movieContainer);
    });
}

generateTrendingList();
