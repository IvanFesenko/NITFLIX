import noPosterImg from '../../images/no-poster.jpg';
import {
  isDefaultLanguage,
  translateNotifyWatched,
  translateNotifyQueue,
} from '../language';

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
  popularity,
}) => {
  const genresMarkup = genres
    .map(({ name }) => `<li class="movie-modal__genres-item">${name}</li>`)
    .join(' ');
  return `<div class="movie-modal js-movie-modal">
  <div class="movie-modal__container animate-modal">
  <button class="movie-modal__close" id="close-movie-modal"></button>
  <button class="movie-modal__scrollUp scrollUp"></button>
    
    <div class="movie-modal__content">
      <div class="movie-modal__top-block">
        <div class="movie-modal__image-wrapper">
        <div class="movie-modal__image-box-shadov">
          <img src=${poster_path !== null ? poster_path : noPosterImg}
          alt=${title}$ class="movie-modal__image">
          </div>

          <div class="movie-modal__btn-wrapper">            
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
              <i class="fab fa-youtube movie-modal__icon"></i>
              <span class="notify">${
                isDefaultLanguage() ? 'Trailers' : 'Трейлер'
              }</span>            
            </button>            
              <button
                class="movie-modal__trailers-btn movie-modal__watched-btn"
                data-active="${InWatched}"
                type="button"
              >
                <i class="fas fa-video movie-modal__icon"></i>
                <span class="notify notify__watched" id="notify__watched"
                  >${translateNotifyWatched(
                    isDefaultLanguage(),
                    InWatched,
                  )}</span
                >
              </button>

              <button
                class="movie-modal__trailers-btn movie-modal__queue-btn"
                data-active="${InQueue}"
                type="button"
              >
                <i class="far fa-bookmark movie-modal__icon"></i>
                <span class="notify" id="notify__queue"
                  >${translateNotifyQueue(isDefaultLanguage(), InQueue)}</span
                >
              </button>            
              <a href="${homepage}" class="movie-modal__trailers-btn" target="_blank"
              >
              <i class="fas fa-link movie-modal__icon"></i> 
              <span class="notify">${
                isDefaultLanguage() ? 'Watch movie' : 'Смотреть фильм'
              }</span>            
              </a>            
          </div>
        </div>

        <div class="movie-modal__overview">
          <h2 class="movie-modal__title">${title}</h2>

          <div class="movie-modal__vote-block">
            <p class="movie-modal__vote-text">${
              isDefaultLanguage() ? 'Vote' : 'Рейтинг'
            } &#8260; ${isDefaultLanguage() ? 'Votes:' : 'Голосов'} </p>
            <p class="movie-modal__vote-block-text">
              <span class="movie-modal__vote-block-averege"
                >${vote_average}</span
              >
              &#8260;
              <span class="movie-modal__vote-block-count">${vote_count}</span>
            </p>
          </div> 

          <div class="movie-modal__vote-block">
          <p class="movie-modal__vote-text">
          ${isDefaultLanguage() ? 'Popularity' : 'Популярность'} 
          </p>
          <p class="movie-modal__vote-block-text">
            <span class="movie-modal__vote-block-averege"
              >${popularity}</span>
            
          </p>
        </div> 

          <div class="movie-modal__genres">
            <p class="movie-modal__genres-title">${
              isDefaultLanguage() ? 'Genres:' : 'Жанры:'
            }</p>
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
    </div>
    </div>
</div>
`;
};

export default MovieDetailsCard;
