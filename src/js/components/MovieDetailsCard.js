import noPosterImg from '../../images/no-poster.jpg';
import { isDefaultLanguage } from '../language';

const MovieDetailsCard = ({
  poster_path,
  title,
  homepage,
  vote_average,
  genres,
  release_date,
  id,
  overview,
  vote_count,
  InWatched,
  InQueue,
}) => {
  const genresMarkup = genres
    .map(({ name }) => `<li class="movie-modal__genres-item">${name}</li>`)
    .join(' ');
  return `<div class="movie-modal js-movie-modal">
  <div class="movie-modal__overlay js-movie-modal__overlay">
    <div class="movie-modal__content animate-modal">
      <button class="movie-modal__close" id="close-movie-modal"></button>

      <div class="movie-modal__top-block">
        <div class="movie-modal__image-wrapper">
          <img src=${poster_path !== null ? poster_path : noPosterImg}
          alt=${title}$ class="movie-modal__image">

          <div class="movie-modal__btn-wrapper">
            
            <div class="movie-modal__my-list">
              <span
                id="dataAtr"
                class="data-atr"
                data-id="${id}"
                data-title="${title}"
                data-poster_path="${
                  poster_path !== null ? poster_path : noPosterImg
                }"
                data-release_date="${release_date}"
                data-vote_average="${vote_average}"
              ></span>
              <button class="movie-modal__trailers-btn">
              <i class="fab fa-youtube">
              <span class="notify__trailer">Trailers</span>
              </i>
            </button>
              <button
                class="watched-btn movie-modal__watched-btn"
                data-active="${InWatched}"
                type="button"
              >
                <i class="fas fa-video"></i>
                <span class="notify__watched" id="notify__watched"
                  >${InWatched ? 'Delete from watched' : 'Add to watched'}</span
                >
              </button>

              <button
                class="queue-btn movie-modal__queue-btn"
                data-active="${InQueue}"
                type="button"
              >
                <i class="far fa-bookmark"></i>
                <span class="notify__queue" id="notify__queue"
                  >${InQueue ? 'Delete from queue' : 'Add to queue'}</span
                >
              </button>
            </div>
          </div>
        </div>

        <div class="movie-modal__overview">
          <h2 class="movie-modal__title">${title}</h2>

          <div class="movie-modal__vote-block">
            <p class="movie-modal__vote-text">Vote &#8260; Votes:</p>
            <p class="movie-modal__vote-block-text">
              <span class="movie-modal__vote-block-averege"
                >${vote_average}</span
              >
              &#8260;
              <span class="movie-modal__vote-block-count">${vote_count}</span>
            </p>
          </div>

          <a href="${homepage}" class="movie-modal__homepage" target="_blank"
            >${homepage}</a
          >

          <div class="movie-modal__genres">
            <h3 class="movie-modal__genres-title">${
              isDefaultLanguage() ? 'Genres:' : 'Жанры:'
            }</h3>
            <ul class="movie-modal__genres-list">
              ${genresMarkup}
            </ul>
          </div>
          <div class="movie-modal__about">
            <h3 class="movie-modal__about-title">${
              isDefaultLanguage() ? 'About:' : 'О фильме:'
            }</h3>
            <p class="movie-modal__about-text">${overview}</p>
          </div>
        </div>
      </div>

      <div class="movie-trailers-wrp">
        <h3 class="movie-trailers__title">Trailers</h3>
        <ul class="movie-trailers-list"></ul>
      </div>
      <button class="movie-modal__scrollUp scrollUp"></button>
    </div>
  </div>
</div>
`;
};

export default MovieDetailsCard;
