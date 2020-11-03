import noPosterImg from '../../images/no-poster.jpg';

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
          <button class="movie-modal__trailers-btn">Show Trailers</button>
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

<div class="movie-modal__my-list">
  <span
    id="dataAtr"
    data-id="${id}"
    data-title="${title}"
    data-poster_path="${poster_path !== null ? poster_path : noPosterImg}"
    data-release_date="${release_date}"
    data-vote_average="${vote_average}"
  ></span>
  <button class="watched">
    <svg
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="svg__watched"
    >
      <path
        d="M17 24.938h-3v1.562l-3 0.5v1h8.938v-0.938l-2.938-0.562v-1.562zM27 4h-23c-1.105 0-2 0.895-2 2v14c0 1.104 0.895 2 2 2h23c1.105 0 2-0.896 2-2v-14c0-1.105-0.895-2-2-2zM15.375 20.5c-0.552 0-1-0.448-1-1 0-0.553 0.448-1 1-1 0.553 0 1 0.447 1 1 0 0.552-0.448 1-1 1zM27 17h-23v-11h23v11z"
      ></path>
    </svg>

  </button>
        <span class="notify__watched">${
          InWatched ? 'Delete from watched' : 'Add to watched'
        }</span>


  <button class="queue">
    <svg
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="svg__queue"
    >
      <path
        d="M19.5 3h0.5l6 7v18.009c0 1.093-0.894 1.991-1.997 1.991h-15.005c-1.107 0-1.997-0.899-1.997-2.007v-22.985c0-1.109 0.897-2.007 2.003-2.007h10.497zM19 4h-10.004c-0.55 0-0.996 0.455-0.996 0.995v23.009c0 0.55 0.455 0.995 1 0.995h15c0.552 0 1-0.445 1-0.993v-17.007h-4.002c-1.103 0-1.998-0.887-1.998-2.006v-4.994zM20 4.5v4.491c0 0.557 0.451 1.009 0.997 1.009h3.703l-4.7-5.5zM16.5 23l-4 3 1.5-5-4-3h5l1.5-5 1.5 5h5l-4 3 1.5 5-4-3z"
      ></path>
    </svg>
  </button>
  <span class="notify__queue" id="notify__queue"
  >${InQueue ? 'Delete from queue' : 'Add to queue'}</span
>
</div>

          <a href="${homepage}" class="movie-modal__homepage" target="_blank"
            >${homepage}</a
          >

          <div class="movie-modal__genres">
            <h3 class="movie-modal__genres-title">Genres:</h3>
            <ul class="movie-modal__genres-list">
              ${genresMarkup}
            </ul>
          </div>
          <div class="movie-modal__about">
            <h3 class="movie-modal__about-title">About</h3>
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
</div>`;
};

export default MovieDetailsCard;
