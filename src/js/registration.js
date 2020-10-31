import Refs from './refs';

import {
  googleAuthorization,
  logOut,
  registration,
  basicAuthorization,
} from './firebase';

export function onLogInState() {
  Refs.googleBtn.style.display = 'none';
  Refs.logInBtn.style.display = 'none';
  Refs.singUpBtn.style.display = 'none';
  Refs.logOutBtn.style.display = 'inline';
  Refs.accInBtn.style.display = 'none';
  closeModalReg();
}

export function onLogOutState() {
  Refs.googleBtn.style.display = 'inline';
  Refs.logInBtn.style.display = 'inline';
  Refs.singUpBtn.style.display = 'inline';
  Refs.logOutBtn.style.display = 'none';
  Refs.accOutBtn.style.display = 'none';
}

Refs.googleBtn.addEventListener('click', googleOnClick);
Refs.logOutBtn.addEventListener('click', logOut);
Refs.singUpBtn.addEventListener('click', registration);
Refs.logInBtn.addEventListener('click', basicAuthorization);

function googleOnClick(e) {
  e.preventDefault();
  googleAuthorization();
}
