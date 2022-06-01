import './css/styles.css';
import Notiflix, { Loading } from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import ImageApiService from './API';
import cardsTpl from "./templates/cards.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
    form: document.querySelector('.search-form'),
    imageList: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
}

const imageApiService = new ImageApiService();
console.log(imageApiService);

const onSearchFormSubmit = (e) => {
    e.preventDefault()

    imageApiService.query = e.currentTarget.elements.searchQuery.value.trim()

    if (imageApiService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }

    clearImagesContainer();
    imageApiService.resetPage();
    imageApiService.fetchImages().then(renderImages)
    e.currentTarget.reset()
}

const renderImages = (images) => {

    if (images.data.total === 0) {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    Notiflix.Notify.info(`Hooray! We found ${images.data.totalHits} images.`)
    refs.imageList.insertAdjacentHTML('beforeend', cardsTpl(images.data.hits))
    new SimpleLightbox('.gallery a', { overlayOpacity: 0.8, captionsData: 'alt', captionDelay: 250, showCounter: false });
}

const onLoadMore = (e) => {
    imageApiService.incrementPage()
    imageApiService.fetchImages().then(renderImages)
}

const clearImagesContainer = () => {
    refs.imageList.innerHTML = ''
}

refs.loadMore.addEventListener('click', onLoadMore)
refs.form.addEventListener('submit', onSearchFormSubmit)