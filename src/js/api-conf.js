export default {
  apiKey: '8978731d3453660c119868bf0fe3e32f',
  baseURL: 'https://api.themoviedb.org/3',
  imageBaseURL: 'https://image.tmdb.org/t/p',
  logoSizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  posterSizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],

  makeImagePath(path, size) {
    return `${this.imageBaseURL}/${this.logoSizes[size]}${path}`;
  },
};
