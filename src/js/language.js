const languageLabel = document.querySelector('.js-language__label');
const languageCheckBox = document.querySelector('#language__input');
const rusFlagSvg = document.querySelector('#language__rus-icon');
const usaFlagSvg = document.querySelector('#language__usa-icon');

function onLoadPage() {
  let selectedLang = localStorage.getItem('language');
  selectedLang = JSON.parse(selectedLang);

  languageCheckBox.checked = selectedLang;

  changeLanguageFlag(selectedLang);
}

function saveLangToLocalStorage(checkBox) {
  const selectedLang = checkBox.checked;
  localStorage.setItem('language', selectedLang);
}

function changeLanguageFlag(check) {
  if (check) {
    usaFlagSvg.classList.add('language-hidden');
    rusFlagSvg.classList.remove('language-hidden');
  } else {
    usaFlagSvg.classList.remove('language-hidden');
    rusFlagSvg.classList.add('language-hidden');
  }
}

function changeLanguage(event) {
  const checkBox = event.target;

  changeLanguageFlag(checkBox.checked);
  saveLangToLocalStorage(checkBox);
}

function handleLanguageBtn(event) {
  //   console.log(checkBox.checked);
  //   console.log(checkBox.value);
  changeLanguage(event);
}

languageCheckBox.addEventListener('change', handleLanguageBtn);

onLoadPage();
