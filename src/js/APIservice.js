import axios from 'axios';

class APIService {
  constructor() {
    this.temp = '';
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

  makeImagePath = (path, size) => {
    if (path !== null) {
      return `${this.imageBaseURL}/${this.logoSizes[size]}${path}`;
    } else {
      return null;
    }
  };

  getData = async url => {
    try {
      const response = await axios.get(url);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  getTrending = lang => {
    this.temp = `${this.baseURL}/trending/movie/day?api_key=${this.API_KEY}&language=${lang}`;

    return this.getData(this.temp);
  };

  getMovieInfo = (id, lang) =>
    this.getData(
      `${this.baseURL}/movie/${id}?api_key=${this.API_KEY}&append_to_response=videos&language=${lang}`,
    );

  getSearchResult = (query, lang) => {
    this.temp = `${this.baseURL}/search/movie?api_key=${this.API_KEY}&language=${lang}&include_adult=true&query=${query}`;

    return this.getData(this.temp);
  };

  getTrailer = id => {
    return this.getData(
      `${this.baseURL}/movie/${id}/videos?api_key=${this.API_KEY}`,
    );
  };

  getNextPage = page => {
    return this.getData(`${this.temp}&page=${page}`);
  };
}

const apiService = new APIService();
export default apiService;
