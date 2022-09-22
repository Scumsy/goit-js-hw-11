import './css/styles.css';
import { getSearchRequest } from './getImages';

// import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import axios from 'axios';

// let images = [];
let inputForSearch = '';
let pageNumber = 1;
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

searchForm.addEventListener('input', e => {
  return (inputForSearch = e.target.value);
});

searchForm.addEventListener('submit', e => {
  e.preventDefault();

  getSearchRequest(inputForSearch, pageNumber).then(images => {
    // console.log(images);
    if (images.length === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      gallery.innerHTML = '';
      renderImageList(images);
    }
  });
});

loadMoreBtn.addEventListener(
  'click',
  (e = async () => {
    pageNumber += 1;
    const response = await getSearchRequest(inputForSearch, pageNumber);

    return renderImageList(response);
  })
);

function makeGalleryMarkup(url, tag, likes, views, comments, downloads) {
  const markup = `<div class="photo-card">
  <img src="${url}" alt="${tag}" loading="lazy" width='300' height='200'/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
    </p>
  </div>
</div>`;
  return markup;
}

function renderImageList(images) {
  for (let i = 0; i < images.length; i += 1) {
    const imageList = makeGalleryMarkup(
      images[i].webformatURL,
      images[i].tags,
      images[i].likes,
      images[i].views,
      images[i].comments,
      images[i].downloads
    );

    gallery.insertAdjacentHTML('beforeend', imageList);
    loadMoreBtn.classList.remove('is-hidden');
  }
}
