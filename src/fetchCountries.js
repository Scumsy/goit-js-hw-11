import Notiflix from 'notiflix';
const options = `fields=name,capital,population,flags,languages`;
function fetchCountries(input) {
  return fetch(`https://restcountries.com/v2/name/${input}?${options}`).then(
    res => {
      //   console.log(res);
      return res.json();
    }
  );
}

export { fetchCountries };

// https://restcountries.com/v2/all?fields=name,capital,currencies
// `https://restcountries.com/v2/name/${input}`;
