import apiService from './APIservice';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
import MoviesCards from './components/MoviesCards';
import refs from './refs';

const pagination = (pages, page) => {
  const wrapper = document.querySelector('.pagination-wrapper');
  const visibleButtons = 5;
  wrapper.innerHTML = ``;

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
    wrapper.insertAdjacentHTML(
      'beforeend',
      `<button value=${page} class="pagination__page-btn">${page}</button>`,
    );
  }

  if (page != 1) {
    wrapper.insertAdjacentHTML(
      'afterbegin',
      `<button value=${1} class="pagination__page-btn">&#171; First</button>`,
    );
  }

  if (page != pages) {
    wrapper.insertAdjacentHTML(
      'beforeend',
      `<button value=${pages} class="pagination__page-btn">Last &#187;</button>`,
    );
  }

  const pageButtonsHandler = e => {
    if (e.target.classList.contains('pagination__page-btn')) {
      const currentPage = Number(e.target.value);
      apiService.getNextPage(currentPage).then(({ data }) => {
        buildPage(data.results, data.page, data.total_pages);
      });
    }
  };

  wrapper.addEventListener('click', pageButtonsHandler);
};

const buildPage = (querySet, page, totalPages) => {
  const size = screenSize();
  const movieList = querySet.map(item => {
    item.poster_path = apiService.makeImagePath(item.poster_path, size);
    return item;
  });
  renderMarkup(movieList, MoviesCards, refs.movieContainer);
  pagination(totalPages, page);
};

const generateTrendingList = () => {
  apiService.getTrending().then(({ data }) => {
    buildPage(data.results, data.page, data.total_pages);
    pagination(data.total_pages, data.page);
    return data.results;
  });
};

generateTrendingList();
