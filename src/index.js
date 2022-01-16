import template from './template.hbs';
import NewsApiService from './apiService';

const searchForm = document.querySelector('.search-form');
const loadMor = document.querySelector('.load-mor');
const addGallery = document.querySelector('.container');
const reset = document.querySelector('.reset');
const openModal = document.querySelector('.lightbox');
const imgGallery = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const message = document.querySelector('.message');
// const none = document.querySelector('.spinner-none');
searchForm.addEventListener('submit', onSearch);
loadMor.addEventListener('click', onloadMor);
btnCloseModal.addEventListener('click', onCloseModalClick);

const newsApiService = new NewsApiService();
let hitList = [];
function onSearch(e) {
  e.preventDefault();

  clearRequest();
  newsApiService.query = e.currentTarget.elements.query.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appMarkup);
}

function onloadMor() {
  newsApiService.fetchArticles().then(appMarkup);
}

function appMarkup(hits) {
  hitList = [...hitList, ...hits];

  addGallery.insertAdjacentHTML('beforeend', template(hits));
  setTimeout(() => {
    addGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 1000);
  if (hits.length < 1) {
    alert('Картинок з такою назвою неіснує');
  } else if (hits.length === 12) {
    reset.classList.remove('reset');
    message.innerHTML = '';
  } else {
    loadMor.classList.add('reset');

    message.insertAdjacentHTML(
      'beforeend',
      '<p class="style_message">Зображення по вашому запиту закінчились</p>'
    );
  }
}

function clearRequest() {
  addGallery.innerHTML = '';
}

const galleryWrapper = document.querySelector('.container');

galleryWrapper.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  if (e.target.nodeName != 'IMG') {
    return;
  }

  openModal.classList.add('is-open');
  window.addEventListener('keydown', onkeydown);
  imgGallery.src = e.target.dataset.src;
}

function onCloseModalClick() {
  imgGallery.src = '';

  openModal.classList.remove('is-open');
}

// =====================================================================

function onkeydown(e) {
  if (e.code === 'ArrowRight') {
    toSlideRight();
  } else if (e.code === 'ArrowLeft') {
    toSlideLeft();
  } else if (e.code === 'Escape') {
    onCloseModalClick();
  } else {
    null;
  }
}

function toSlideRight() {
  const lengthArray = hitList.length;
  for (let i = 0; i < lengthArray; i += 1) {
    if (imgGallery.getAttribute('src') === hitList[i].largeImageURL) {
      imgGallery.setAttribute('src', hitList[i + 1].largeImageURL);
      return;
    }
  }
}

function toSlideLeft() {
  const lengthArray = hitList.length;
  for (let i = 0; i < lengthArray; i += 1) {
    if (imgGallery.getAttribute('src') === hitList[i].largeImageURL) {
      imgGallery.setAttribute('src', hitList[i - 1].largeImageURL);
      return;
    }
  }
}
