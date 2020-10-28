import axios from 'axios';
import conf from './api-conf';
import refs from './refs';
import trendingTemplate from '../templates/trendingTemplate.hbs';

async function fetchTrending() {
  const url = `${conf.baseURL}/trending/movie/day?api_key=${conf.apiKey}`;

  try {
    const response = await axios.get(url);
    const results = response.data.results;

    return results;
  } catch (error) {
    console.log(error);
  }
}

async function fetchMovieInfo() {
  const url = `https://api.themoviedb.org/3/find/${external_id}?api_key=8978731d3453660c119868bf0fe3e32f&language=en-US&external_source=imdb_id`;
}

function makeImagePath(path, size) {
  return `${conf.imageBaseURL}/${conf.logoSizes[size]}${path}`;
}

function generateTrendingList() {
  fetchTrending().then(res => {
    //make fullImagePath
    console.log(res);
    res = res.map(item => {
      item.backdrop_path = makeImagePath(item.backdrop_path, 5);
      item.poster_path = makeImagePath(item.poster_path, 4);

      return item;
    });

    //make markup
    const markup = trendingTemplate(res);
    refs.trendingContainer.insertAdjacentHTML('beforeend', markup);
  });
}

generateTrendingList();
