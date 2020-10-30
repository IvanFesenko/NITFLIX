const renderMarkup = (data, markup, container) => {
  container.insertAdjacentHTML('beforeend', markup(data));
};
export default renderMarkup;
