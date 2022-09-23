import axios from 'axios';
const axios = require('axios');
const options = `&image_type=photo&orientation=horizontal&safesearch=true`;
const KEY = '29997517-93cd94c02db4cfa0c008c948f';
const BASE_URL = 'https://pixabay.com/api/';

async function getSearchRequest(input, pageNumber) {
  const res = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${input}${options}&page=${pageNumber}&per_page=40`
  );
  return res.data;
}

export { getSearchRequest };
