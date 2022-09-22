import Notiflix from 'notiflix';
import axios from 'axios';
const axios = require('axios');
const options = `&image_type=photo&orientation=horizontal&safesearch=true`;
const KEY = '29997517-93cd94c02db4cfa0c008c948f';
const BASE_URL = 'https://pixabay.com/api/';

let images = [];
async function getSearchRequest(input, pageNumber) {
  try {
    const res = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${input}${options}&page=${pageNumber}&per_page=40`
    );
    images = res.data.hits;
    return images;
  } catch {
    Notiflix.Notify.failure("We're sorry, something went wrong.");
  }
}

export { getSearchRequest };
