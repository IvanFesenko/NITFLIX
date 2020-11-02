import apiService from './APIservice';
import renderMarkup from './renderMarkup';
import screenSize from './services/screenSize';
import MoviesCards from './components/MoviesCards';
import refs from './refs';

function generateTrendingList() {
  const size = screenSize();

  apiService.getTrending().then(({ data }) => {
    console.log(data);

    const state = {
      querySet: data.results,
      totalPages: data.total_pages,
      page: 1,
      perPage: 20,
      visibleButtons: 5,
    };

    console.log(state);

    const pagination = (querySet, page, perPage) => {
      const trimStart = (page - 1) * perPage;
      const trimEnd = trimStart + perPage;
      const trimmedData = querySet.slice(trimStart, trimEnd);
      const pages = Math.round(querySet.length / perPage);
      return {
        querySet: trimmedData,
        pages: pages,
      };
    };

    const pageButtons = pages => {
      const wrapper = document.querySelector('.pagination-wrapper');

      wrapper.innerHTML = ``;
      console.log('Pages:', pages);

      let maxLeft = state.page - Math.floor(state.visibleButtons / 2);
      let maxRight = state.page + Math.floor(state.visibleButtons / 2);

      if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.visibleButtons;
      }

      if (maxRight > pages) {
        maxLeft = pages - (state.visibleButtons - 1);

        if (maxLeft < 1) {
          maxLeft = 1;
        }
        maxRight = pages;
      }

      for (let page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="pagination__page-btn">${page}</button>`;
      }

      if (state.page != 1) {
        wrapper.innerHTML =
          `<button value=${1} class="pagination__page-btn">&#171; First</button>` +
          wrapper.innerHTML;
      }

      if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="pagination__page-btn">Last &#187;</button>`;
      }

      const pageButtons = wrapper.querySelectorAll('.pagination__page-btn');
      pageButtons.forEach(btn =>
        btn.addEventListener('click', e => {
          const currentPage = e.target.value;
          state.page = Number(currentPage);
          apiService.setPage = state.page;
          buildPage();
        }),
      );
    };

    const buildPage = () => {
      const data = pagination(state.querySet, state.page, state.perPage);
      const movieList = data.querySet.map(item => {
        item.poster_path = apiService.makeImagePath(item.poster_path, size);
        return item;
      });
      renderMarkup(movieList, MoviesCards, refs.movieContainer);
      pageButtons(data.totalPages);
    };

    pagination(state.querySet, state.page, state.perPage);
    pageButtons(state.totalPages);
    buildPage();

    return data.results;
  });
  // .then(res => {
  //   res = res.map(item => {
  //     item.poster_path = apiService.makeImagePath(item.poster_path, size);
  //     return item;
  //   });
  //   renderMarkup(res, MoviesCards, refs.movieContainer);
  // });
}

generateTrendingList();
