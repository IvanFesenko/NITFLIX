import refs from '../refs';

const clearContainers = () => {
  refs.movieContainer.innerHTML = '';
  refs.cleanBoxWrp.innerHTML = '';
  if (refs.paginationWrp.style.display === 'flex') {
    refs.paginationWrp.style = 'display:none';
  }
};

export default clearContainers;
