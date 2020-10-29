import noPosterImg from '../../images/no-poster.jpg';

const MoviesCards = results => {
  const markup = results.map(
    ({ title, id, backdrop_path, release_date, vote_average }) => {
      return `<div class="movie__wrapper">
    <h3 class="movie__title">${title}</h3>
    <div class="movie__image-wrapper">
        <img src="${
          backdrop_path !== null ? backdrop_path : noPosterImg
        }" alt="${title}" class="movie__image" data-id="${id}"
            data-id="${title}">
    </div>
    <span class="movie__release-date">${release_date}</span>
    <span class="movie__average">${vote_average}</span>
</div>`;
    },
  );
  return markup.join(' ');
};

export default MoviesCards;
