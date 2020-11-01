import noPosterImg from '../../images/no-poster.jpg';

const MovieDetailsCard = ({
  poster_path,
  title,
  homepage,
  vote_average,
  genres,
  overview,
  vote_count,
}) => {
  const genresMarkup = genres
    .map(({ name }) => `<li class="movie-modal__genres-item">${name}</li>`)
    .join(' ');

  return `<div class="movie-modal js-movie-modal">
    <div class="movie-modal__overlay js-movie-modal__overlay"></div>
    <div class="movie-modal__content animate-modal">
      <div class="movie-modal__content-wrapper">
        <button class="movie-modal__close" id="close-movie-modal"></button>
        
        <div class="movie-modal__image-wrapper">
          <img src=${poster_path !== null ? poster_path : noPosterImg}
          alt=${title}$ class="movie-modal__image">
        </div>
        <button class="movie-modal__trailers-btn">Show Trailers</button>

        <div class="movie-modal__vote-block">
          <p class="movie-modal__vote-block-text">
            <span class="movie-modal__vote-block-averege">${vote_average}</span>
            &#8260;
            <span class="movie-modal__vote-block-count">${vote_count}</span>
          </p>
        </div>
        <div class="movie-modal__title-block">
          <h2 class="movie-modal__original-title">${title}</h2>
          <a href="${homepage}" class="movie-modal__homepage" target="_blank"
            >${homepage}</a
          >
        </div>
        <h3 class="movie-modal__list-title">Genres:</h3>
        <ul class="movie-modal__genres">
          ${genresMarkup}
        </ul>
        <h3 class="movie-modal__about-title">About</h3>
        <p class="movie-modal__overview">${overview}</p>
        <div class="movie-trailers-wrp">
          <h3 class="movie-trailers__title">Trailers</h3>
          <ul class="movie-trailers-list"></ul>
        </div>
        <button class="movie-modal__scrollUp"></button>
      </div>
    </div>
  </div>`;
};

export default MovieDetailsCard;
