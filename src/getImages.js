import Notiflix from 'notiflix';
import axios from 'axios';
const axios = require('axios');
const options = `&image_type=photo&orientation=horizontal&safesearch=true`;
const KEY = '29997517-93cd94c02db4cfa0c008c948f';
const BASE_URL = 'https://pixabay.com/api/';

function getSearchRequest(input) {
  return axios.get(`${BASE_URL}?key=${KEY}&q=${input}${options}`).then(res => {
    console.log(res);
  });
}
export { getSearchRequest };

// function fetchCountries(input) {
//   return fetch(`https://restcountries.com/v2/name/${input}?${options}`).then(
//     res => {
//       //   console.log(res);
//       return res.json();
//     }
//   );
// }

// export { fetchCountries };

// https://restcountries.com/v2/all?fields=name,capital,currencies
// `https://restcountries.com/v2/name/${input}`;
