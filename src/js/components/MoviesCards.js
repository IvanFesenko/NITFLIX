import noPosterImg from '../../images/no-poster.jpg';

const MoviesCards = results => {
  const markup = results.map(
    ({ title, id, poster_path, release_date, vote_average }) => {
      return `<div class="movie__wrapper" tabindex="0">
      
    <div class="movie__image-wrapper">
        <img src="${
          poster_path !== null ? poster_path : noPosterImg
        }" alt="${title}" class="movie__image" data-id="${id}"
            data-id="${title}">
            <span class="movie__average">${vote_average}</span>
    </div>
      <div class="movie__description">
        <h3 class="movie__title">${title}</h3>
        
        <span class="movie__release-date">${release_date}</span>
    </div>
    
</div>`;
    },
  );
  return markup.join(' ');
};

export default MoviesCards;
