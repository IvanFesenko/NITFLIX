const preContainer = document.querySelector('.preloader__container');
const body = document.querySelector('body');

function deletePreloader() {
  preContainer.remove();
}
setTimeout(() => {
  deletePreloader();
}, 7000);
