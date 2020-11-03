import Refs from './refs';
import { onCloseModalReg } from './modalRegistration';

import {
  googleAuthorization,
  logOut,
  registration,
  basicAuthorization,
} from './firebase';

export function onLogInState() {
  Refs.logOutBtn.style.display = 'block';
  Refs.logOutBtn.classList.remove('visually-hidden');
  Refs.accInBtn.style.display = 'none';
  onCloseModalReg();
}

export function onLogOutState() {
  Refs.logOutBtn.style.display = 'none';
  Refs.accInBtn.style.display = 'block';
  Refs.logOutBtn.classList.add('visually-hidden');
}

Refs.googleBtn.addEventListener('click', googleOnClick);
Refs.logOutBtn.addEventListener('click', logOut);
Refs.singUpBtn.addEventListener('click', registration);
Refs.logInBtn.addEventListener('click', basicAuthorization);

function googleOnClick(e) {
  e.preventDefault();
  googleAuthorization();
}

Refs.modalTextLogin.addEventListener('click', showElementLog);
Refs.modalTextReg.addEventListener('click', showElementReg);

function showElementReg() {
  Refs.modalTextReg.classList.add('is-activ-elem');
  Refs.modalTextLogin.classList.remove('is-activ-elem');
  Refs.logInBtn.classList.add('visually-hidden', 'is-hidden');
  Refs.singUpBtn.classList.remove('visually-hidden', 'is-hidden');
}

function showElementLog() {
  Refs.modalTextReg.classList.remove('is-activ-elem');
  Refs.modalTextLogin.classList.add('is-activ-elem');
  Refs.logInBtn.classList.remove('visually-hidden', 'is-hidden');
  Refs.singUpBtn.classList.add('visually-hidden', 'is-hidden');
}
