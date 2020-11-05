import apiService from './APIservice';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
import MoviesCards from './components/MoviesCards';
import clearMovieList from './services/clearMovieList';
import refs from './refs';
import { isDefaultLanguage } from './language';

const { paginationWrp, movieContainer } = refs;

const addActiveBtn = page => {
  const paginationBtns = paginationWrp.querySelectorAll(
    '.pagination__page-btn',
  );
  if (paginationBtns.length && paginationBtns !== null) {
    paginationBtns.forEach(btn => {
      if (Number(btn.value) === page) {
        btn.classList.add('active');
      }
    });
  }
};

const pageButtonsHandler = e => {
  e.preventDefault();
  if (e.target.classList.contains('pagination__page-btn')) {
    const currentPage = Number(e.target.value);
    apiService.getNextPage(currentPage).then(({ data }) => {
      buildPage(data.results, data.page, data.total_pages);
    });
    const container = document.querySelector('html');
    container.scrollTop = 0;
  }
};
paginationWrp.addEventListener('click', pageButtonsHandler);

export const pagination = (pages, page) => {
  const visibleButtons = 5;
  paginationWrp.innerHTML = ``;
  if (pages === 1) {
    paginationWrp.style = 'display:none';
  } else {
    paginationWrp.style = 'display:flex';
  }
  let maxLeft = page - Math.floor(visibleButtons / 2);
  let maxRight = page + Math.floor(visibleButtons / 2);

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = visibleButtons;
  }

  if (maxRight > pages) {
    maxLeft = pages - (visibleButtons - 1);

    if (maxLeft < 1) {
      maxLeft = 1;
    }
    maxRight = pages;
  }

  for (let page = maxLeft; page <= maxRight; page++) {
    paginationWrp.insertAdjacentHTML(
      'beforeend',
      `<button value=${page} class="pagination__page-btn">${page}</button>`,
    );
  }

  if (page != 1) {
    paginationWrp.insertAdjacentHTML(
      'afterbegin',
      `<button value=${1} class="pagination__page-btn">&#171; ${
        isDefaultLanguage() ? 'First' : 'Первая'
      }</button>`,
    );
  }

  if (page != pages) {
    paginationWrp.insertAdjacentHTML(
      'beforeend',
      `<button value=${pages} class="pagination__page-btn">${
        isDefaultLanguage() ? 'Last' : 'Последняя'
      } &#187;</button>`,
    );
  }
};

export const buildPage = (querySet, page, totalPages) => {
  const size = screenSize();
  clearMovieList();
  const movieList = querySet.map(item => {
    item.poster_path = apiService.makeImagePath(item.poster_path, size);
    return item;
  });
  renderMarkup(movieList, MoviesCards, movieContainer);
  pagination(totalPages, page);
  addActiveBtn(page);
};
