import './css/styles.css';
import { getSearchRequest } from './getImages';
import Notiflix from 'notiflix';

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
  try {
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
  } catch {
    Notiflix.Notify.failure("We're sorry, something went wrong.");
  }
});

loadMoreBtn.addEventListener('click', e => {
  pageNumber += 1;
  try {
    getSearchRequest(inputForSearch, pageNumber).then(images => {
      renderImageList(images);
    });
  } catch {
    Notiflix.Notify.failure("We're sorry, something went wrong.");
  }
});

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
  const renderImages = images.hits.map(image => {
    let { webformatURL, tags, likes, views, comments, downloads } = image;
    return makeGalleryMarkup(
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads
    );
  });
  gallery.insertAdjacentHTML('beforeend', renderImages);
  const maxPage = Math.ceil(images.totalHits / 40);
  if (maxPage === pageNumber) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    loadMoreBtn.classList.remove('is-hidden');
  }
}
