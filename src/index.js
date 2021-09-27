import template from './template.hbs';
import NewsApiService from './apiService';

const searchForm = document.querySelector('.search-form');
const loadMor = document.querySelector('.load-mor');
const addGallery = document.querySelector('.container');
const reset = document.querySelector('.reset');

searchForm.addEventListener('submit', onSearch);
loadMor.addEventListener('click', onloadMor);

const newsApiService = new NewsApiService();

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
  addGallery.insertAdjacentHTML('beforeend', template(hits));
  setTimeout(() => {
    addGallery.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 1000)
  reset.classList.remove('reset');
}

function clearRequest() {
  addGallery.innerHTML = '';
}

