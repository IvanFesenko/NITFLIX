import Refs from './refs';
import {onCloseModalReg} from './components/modalRegistration'
 
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

