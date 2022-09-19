import './css/styles.css';
import { getSearchRequest } from './getImages';

// import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import axios from 'axios';

let inputForSearch;

// const searchForm = document.querySelector('#search-form');
// console.log(searchForm);
// searchForm.addEventListener('submit', getSearchRequest(searchForm[0].value));

// console.log(searchForm);

// function getDataSearch(data) {
//   inputForSearch = data.target.value.trim();
//   if (inputForSearch !== '') {
//     return getSearchRequest(inputForSearch)
//       .then(displayCountry)
//       .catch(error => {});
//   }
// }

// ---------------Search form-----------------
const inputData = document.querySelector('.input-field');
console.log(inputData);
inputData.addEventListener('input', showValue(inputData));

function showValue(input) {
  inputForSearch = input.textContent;
  console.log(inputForSearch);
}

// ------------------- SUBMIT BTN ----------------------
const submitBtn = document.querySelector('.submit-btn');
submitBtn.addEventListener('submit', e => {
  e.preventDefault();
  return getSearchRequest(inputForSearch);
});
