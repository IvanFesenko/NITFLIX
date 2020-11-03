import refs from './refs';

const { languageCheckBox, rusFlagSvg, usaFlagSvg } = refs;

function onLoadPage() {
  let selectedLang = localStorage.getItem('language');
  selectedLang = JSON.parse(selectedLang);

  languageCheckBox.checked = selectedLang.checked;
  changeLanguageFlag(selectedLang.checked);
}

function saveLangToLocalStorage(checkBox) {
  const selectedLang = {};

  selectedLang.checked = checkBox.checked;

  if (checkBox.checked) {
    selectedLang.languge = 'rus';
  } else {
    selectedLang.languge = 'en';
  }

  localStorage.setItem('language', JSON.stringify(selectedLang));
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
  changeLanguage(event);
}

languageCheckBox.addEventListener('change', handleLanguageBtn);

onLoadPage();
