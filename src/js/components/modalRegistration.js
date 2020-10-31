import Refs from '../refs';

Refs.accInBtn.addEventListener('click', onOpenModalRegistration);
Refs.modalCloseBtn.addEventListener('click', onCloseModalReg);
Refs.modalReg.addEventListener('click', onClickBackDrop);

export function onOpenModalRegistration() {
    Refs.modalReg.classList.add('modal-active');  
    Refs.modalReg.classList.remove('visually-hidden');
    document.querySelector('html').style = 'overflow:hidden;';
    window.addEventListener('keydown', onPressEsc);
}
  
export function onCloseModalReg() {
    Refs.modalReg.classList.remove('modal-active');
    Refs.modalReg.classList.add('visually-hidden');
    document.querySelector('html').style = ' overflow-x: hidden;'; 
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
  

  