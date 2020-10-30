import axios from 'axios';

class APIService {
  constructor() {
    this.API_KEY = '8978731d3453660c119868bf0fe3e32f';
    this.baseURL = 'https://api.themoviedb.org/3';
    this.imageBaseURL = 'https://image.tmdb.org/t/p';
    this.logoSizes = ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'];
    this.posterSizes = [
      'w92',
      'w154',
      'w185',
      'w342',
      'w500',
      'w780',
      'original',
    ];
  }

  screenSize() {
    const screen = document.body.clientWidth;

    if (screen < 768) {
      return 4;
    } else if (screen < 1024) {
      return 5;
    } else {
      return 6;
    }
  }

  makeImagePath = (path, size) => {
    return `${this.imageBaseURL}/${this.logoSizes[size]}${path}`;
  };

  getData = async url => {
    try {
      const response = await axios.get(url);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getTrending = () =>
    this.getData(`${this.baseURL}/trending/movie/day?api_key=${this.API_KEY}`);

  getMovieInfo = id =>
    this.getData(
      `${this.baseURL}/movie/${id}?api_key=${this.API_KEY}&append_to_response=videos`,
    );

  getSearchResult = query => {
    this.temp = `${this.baseURL}/search/movie?api_key=${this.API_KEY}&language=en-US&page=1&include_adult=true&query=${query}`;

    return this.getData(this.temp);
  };

  getNextPage = page => {
    return this.getData(this.temp + '&page=' + page);
  };

  getTvShow = id => {
    return this.getData(
      `${this.baseURL}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`,
    );
  };
  getTopRated = () =>
    this.getData(
      `${this.baseURL}/tv/top_rated?api_key=${this.API_KEY}&language=ru-RU`,
    );
  getAiringToday = () =>
    this.getData(
      `${this.baseURL}/tv/airing_today?api_key=${this.API_KEY}&language=ru-RU`,
    );
  getPopular = () =>
    this.getData(
      `${this.baseURL}/tv/popular?api_key=${this.API_KEY}&language=ru-RU`,
    );
  getWeek = () =>
    this.getData(
      `${this.baseURL}/tv/on_the_air?api_key=${this.API_KEY}&language=ru-RU`,
    );

  getVideo = id => {
    return this.getData(
      `${this.baseURL}/tv/${id}/videos?api_key=${this.API_KEY}&language=ru-RU`,
    );
  };
}

const apiService = new APIService();
export default apiService;
