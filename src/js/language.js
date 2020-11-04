import refs from './refs';

const { languageCheckBox, rusFlagSvg, usaFlagSvg } = refs;

let selectedLang = {};

function switchFlagToRus() {
  usaFlagSvg.classList.add('language-hidden');
  rusFlagSvg.classList.remove('language-hidden');
}

function switchFlagToEn() {
  usaFlagSvg.classList.remove('language-hidden');
  rusFlagSvg.classList.add('language-hidden');
}

function switchToRusLang() {
  switchFlagToRus();

  selectedLang.checked = true;
  selectedLang.language = 'ru-RU';
  localStorage.setItem('language', JSON.stringify(selectedLang));
}

function switchToEnLang() {
  switchFlagToEn();

  selectedLang.checked = false;
  selectedLang.language = 'en-EN';
  localStorage.setItem('language', JSON.stringify(selectedLang));
}

function onLoadPage() {
  if (!localStorage.getItem('language')) {
    const defaultLang = {
      language: 'en-EN',
      checked: false,
    };

    localStorage.setItem('language', JSON.stringify(defaultLang));
  }

  selectedLang = localStorage.getItem('language');
  selectedLang = JSON.parse(selectedLang);
  languageCheckBox.checked = selectedLang.checked;

  if (selectedLang.language === 'en-EN') {
    switchToEnLang();
  } else {
    switchToRusLang();
  }
}

function handleLanguageBtn(event) {
  if (selectedLang.language === 'en-EN') {
    switchToRusLang();
  } else {
    switchToEnLang();
  }
}

export function isDefaultLanguage() {
  const selectedLang = localStorage.getItem('language');
  const current = JSON.parse(selectedLang);
  return !current.checked;
}

export function getLanguageCode() {
  const result = localStorage.getItem('language');
  const current = JSON.parse(result);
  return current.language;
}

languageCheckBox.addEventListener('change', handleLanguageBtn);

onLoadPage();
