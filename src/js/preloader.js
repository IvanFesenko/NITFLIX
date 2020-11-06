import refs from '../js/refs';

function deletePreloader() {
  refs.preContainer.remove();
}
setTimeout(() => {
  deletePreloader();
}, 6300);
