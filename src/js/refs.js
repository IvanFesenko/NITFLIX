export default {
  body: document.querySelector('body'),

  // HEADER
  logo: document.querySelector('.logo'),
  homeLink: document.querySelector('.home-link'),
  accBtn: document.querySelector('.account-wrap'),
  accInBtn: document.querySelector('#singIn'),
  myListRef: document.querySelector('.sub-menu__wr'),
  listWatchedRef: document.querySelector('.js-userList-watched'),
  listQueueRef: document.querySelector('.js-userList-queue'),

  mainTitle: document.querySelector('.main-title'),
  //START modal
  movieContainer: document.querySelector('.js-movie__container'),
  modalBlurContainer: document.querySelector('.js-blur-container'),
  modalReg: document.querySelector('.modal-wrap'),
  modalCloseBtn: document.querySelector('.modal-close-btn'),
  modalTextLogin: document.querySelector('.modal__text-login'),
  modalTextReg: document.querySelector('.modal__text-reg'),
  //END modal

  // user Login and Registrations (Do not change key!)
  googleBtn: document.querySelector('#googleIn'),
  logInBtn: document.querySelector('#loginbtn'),
  singUpBtn: document.querySelector('#singupbtn'),
  logOutBtn: document.querySelector('#logOut'),
  inputEmail: document.querySelector('#inputEmail'),
  inputPassword: document.querySelector('#inputPassword'),
  //END user Login and Registrations

  searchForm: document.querySelector('.search-form'),
  searchFormInput: document.querySelector('.search-form__input'),

  //pagination
  paginationWrp: document.querySelector('.pagination-wrapper'),

  // clean-box
  cleanBoxWrp: document.querySelector('.clean-box'),

  // Spiner
  spiner: document.querySelector('.spiner-wrap'),

  //lang
  languageCheckBox: document.querySelector('#language__input'),
  usaFlagSvg: document.querySelector('#language__usa-icon'),
  rusFlagSvg: document.querySelector('#language__rus-icon'),

  //preloader
  preContainer: document.querySelector('.preloader__container'),
};
