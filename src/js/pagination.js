import apiService from './APIservice';
const data = apiService.getTrending().then(({ data }) => {
  console.log(data);
  console.log(data.results);
  pageButtons(data.total_pages);
  return data;
});

const state = {
  querySet: data.results,
  totalPages: data.totalPages,
  page: 1,
  perPage: 20,
  visibleButtons: 5,
};

const pagination = (querySet, page, perPage) => {
  const trimStart = (page - 1) * perPage;
  const trimEnd = trimStart + perPage;
  const trimmedData = querySet.slice(trimStart, trimEnd);
  const pages = state.totalPages || Math.round(querySet.length / perPage);
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

  const pageButton = wrapper.querySelector('.pagination__page-btn');
  pageButton.addEventListener('click', e => {
    state.page = Number(e.textContent);
  });
};

const test = () => {
  //   pagination(state.querySet, state.page, state.perPage);
};
test();
