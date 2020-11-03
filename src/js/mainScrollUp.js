import debounce from 'lodash-es/debounce';

const container = document.querySelector('html');
console.log(container);
const mainScrollUp = document.querySelector('.main-scrollUp');

const handleScrollUpBtnClick = () => {
  container.scrollTop = 0;
  console.log('click');
};

const scrollFunction = () => {
  if (container.scrollTop > 20) {
    mainScrollUp.style = 'opacity:1';
    console.log('show');
  } else {
    mainScrollUp.style = 'opacity:0';
    console.log('hide');
  }
};

window.addEventListener('scroll', debounce(scrollFunction, 150));
mainScrollUp.addEventListener('click', handleScrollUpBtnClick);
