import './css/styles.css';
import Notiflix, { Loading } from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import ImageApiService from './API';
import cardsTpl from "./templates/cards.hbs";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import LoadMoreBtn from "./load-more-btn.js";


const refs = {
    form: document.querySelector('.search-form'),
    imageList: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
};

const imageApiService = new ImageApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const onSearchFormSubmit = (e) => {
    e.preventDefault();

    imageApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (imageApiService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };

    clearImagesContainer();

    imageApiService.resetPage();
    imageApiService.resetQPages();

    imageApiService.fetchImages().then(images => {
        notify(images);
        renderImages(images);
        loadMoreBtn.show();
        imageApiService.totalHits = images.totalHits
    }).catch(error => {
        loadMoreBtn.hide();
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    });

    e.currentTarget.reset();
}

const renderImages = ({ hits }) => {

    refs.imageList.insertAdjacentHTML('beforeend', cardsTpl(hits));

    new SimpleLightbox('.gallery a', { overlayOpacity: 0.8, captionsData: 'alt', captionDelay: 250 });
}

const onLoadMore = (e) => {
    imageApiService.fetchImages().then(images => {

        if (imageApiService.qPages() === imageApiService.page) {
            loadMoreBtn.hide();
        };
        renderImages(images);
    }).catch(error => {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hide();
    });
}

const clearImagesContainer = () => {
    refs.imageList.innerHTML = '';
}

const notify = ({ totalHits }) => {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
}

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.form.addEventListener('submit', onSearchFormSubmit);