import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let inputForSearch;
// ---------------Search form-----------------
const inputData = document.querySelector('#search-box');
inputData.addEventListener('input', debounce(getDataSearch, DEBOUNCE_DELAY));
const countryDisplay = document.querySelector('.country-info');
const countryListDisplay = document.querySelector('.country-list');

function getDataSearch(data) {
  inputForSearch = data.target.value.trim();
  if (inputForSearch !== '') {
    return fetchCountries(inputForSearch)
      .then(displayCountry)
      .catch(error => {});
  } else {
    countryDisplay.innerHTML = '';
    countryListDisplay.innerHTML = '';
  }
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function showInfoNotification() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function displayCountry(country) {
  if (country.length > 10) {
    showInfoNotification();
  } else if (country.status === 404) {
    onError();
  } else if (country.length === 1 && country.innerHTML !== '') {
    renderCountry(country);
  }
  if (country.length > 1) {
    countryDisplay.innerHTML = '';
  }
  if (country.length > 1 && country.length <= 10) {
    renderCountryList(country);
  } else {
    countryListDisplay.innerHTML = '';
  }
}

function makeCountryMarkup(name, capital, population, flag, languages) {
  const markup = `      <div class="flag-and-name"><img class="country-flag" src="${flag}" alt="${name} official flag" width="50" height="40" />
      <h1>${name}</h1></div>
      <ul class="country-info-list">
        <li><span class="country-info__header">Capital:</span>${capital}</li>
        <li><span class="country-info__header">Population:</span>${population}</li>
        <li><span class="country-info__header">Languages:</span>${languages}</li>
      </ul>`;
  return markup;
}

function makeCountrylistMarkup(name, flag) {
  const markupList = `<li class="country-list__item"><img class="country-list__image" src="${flag}" alt="${name} official flag" width="40" height="25" /><span>${name}</span></li>`;
  return markupList;
}

function renderCountry(country) {
  const languagesNames = [];
  let languagesOfCountry = country[0].languages;
  for (const languageName of languagesOfCountry) {
    languagesNames.push(languageName.name);
  }

  const newCountry = makeCountryMarkup(
    country[0].name,
    country[0].capital,
    country[0].population,
    country[0].flags.svg,
    languagesNames.join(', ')
  );
  countryDisplay.innerHTML = newCountry;
}

function renderCountryList(country) {
  for (let i = 0; i < country.length; i += 1) {
    const newCountryList = makeCountrylistMarkup(
      country[i].name,
      country[i].flags.svg
    );

    countryListDisplay.insertAdjacentHTML('beforeend', newCountryList);
  }
}
