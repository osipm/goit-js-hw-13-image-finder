export default class NewsApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  fetchArticles(searchQuery) {
    const none = document.querySelector('.spinner-none');

    none.classList.remove('spinner-none');
    return fetch(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23546576-898e6f2f9578ee60189c27f38`
    )
      .then(r => r.json())
      .then(data => {
        this.page += 1;

        return data.hits;
      })
      .finally(() => none.classList.add('spinner-none'));
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
