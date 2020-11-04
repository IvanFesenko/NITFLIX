import Refs from './refs';

Refs.accInBtn.addEventListener('click', onOpenModalRegistration);
Refs.modalCloseBtn.addEventListener('click', onCloseModalReg);
Refs.modalReg.addEventListener('click', onClickBackDrop);

export function onOpenModalRegistration() {
  Refs.modalReg.classList.add('modal-active');
  Refs.modalReg.classList.remove('visually-hidden', 'is-hidden');
  document.querySelector('html').style = 'overflow:hidden;';
  window.addEventListener('keydown', onPressEsc);
}

export function onCloseModalReg() {
  Refs.modalReg.classList.remove('modal-active');
  Refs.modalReg.classList.add('visually-hidden', 'is-hidden');
  document.querySelector('html').style = ' overflow-x: hidden;';
  const passRefSpan = document.querySelector('#pass-span');
  passRefSpan.classList.remove('invalid');
  Refs.inputPassword.value = '';
  window.removeEventListener('keydown', onPressEsc);
}

function onPressEsc(event) {
  if (event.key === 'Escape') {
    onCloseModalReg();
  }
}

function onClickBackDrop(event) {
  if (event.target === event.currentTarget) {
    onCloseModalReg();
  }
}

Refs.inputEmail.addEventListener('focus', changeLabelInput);
Refs.inputEmail.addEventListener('blur', changeLabelInput);
Refs.inputPassword.addEventListener('focus', changeLabelInput);
Refs.inputPassword.addEventListener('blur', changeLabelInput);

function changeLabelInput(event) {
  if (!Refs.inputEmail.value.trim() && event.target.id === 'inputEmail') {
    if (!Refs.inputEmail.value.trim()) {
      Refs.inputEmail.value = '';
    }
    document
      .querySelector('#email-span')
      .classList.toggle('is-activ-focus-input');
  }

  if (!Refs.inputPassword.value && event.target.id === 'inputPassword') {
    document
      .querySelector('#pass-span')
      .classList.toggle('is-activ-focus-input');
  }
}
