const axios = require('axios');

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27788557-ef284ffc5471aee7171defc77';

export default class ImageApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchImages() {
        const URL = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

        return axios.get(URL).then(function (response) {
            if (response.status === 400 || response.data.hits.length === 0) {
                throw new Error(response.status);
            }
            return response;
        }).then(({ data }) => {
            this.incrementPage();
            return data
        })
    }

    incrementPage() {
        this.page += 1
    }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}