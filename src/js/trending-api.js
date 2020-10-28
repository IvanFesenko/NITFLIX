import axios from 'axios';

const trendingApi = {
  apiKey: '8978731d3453660c119868bf0fe3e32f',
  baseURL: 'https://api.themoviedb.org/3',
  imageBaseURL: 'https://image.tmdb.org/t/p',
  logoSizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  posterSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],

  async fetchTrending() {
    const url = `${this.baseURL}/trending/movie/day?api_key=${this.apiKey}`;

    try {
      const response = await axios.get(url);

      const { data } = response;

      const { results } = data;
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  },

  makeImagePath(path) {
    return `${this.imageBaseURL}/${this.logoSizes[4]}${path}`;
  },
};

trendingApi.fetchTrending();

console.log(trendingApi.makeImagePath('/3Ysvp4ODDC6sucdQ9quHWkMiKED.jpg'));
