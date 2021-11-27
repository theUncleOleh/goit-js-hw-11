import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import FetchImageApi from './fetchImageApi'














const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
    container: document.querySelector('.container'),
    loadMore: document.querySelector('.load-more'),
}

const fetchImageApi = new FetchImageApi();



refs.searchForm.addEventListener('submit', handleFormSubmit);
refs.loadMore.addEventListener('click', handleBtnClick)

function handleFormSubmit(evt) {
   evt.preventDefault()
   
   fetchImageApi.query = evt.currentTarget.elements.searchQuery.value;
   
   fetchImageApi.resetPage();
    
   fetchImageApi.fetchImage().then(hits => {
      if (hits.length < 1) {
        return  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            
          return renderImageList (hits);
    });
   
    
        
          
        } 

    







function renderImageList (hits) {
  
    const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery-item" href="${largeImageURL}"><div class="photo-card"> 
        <img class="photo-image" src="${webformatURL}"  alt="${tags}" loading="lazy" />
         
         <div class="info">
         
           <p class="info-item">
             <b>Likes: ${likes}</b>
           </p>
           <p class="info-item">
             <b>Views: ${views}</b>
           </p>
           <p class="info-item">
             <b>Comment: ${comments}</b>
           </p>
           <p class="info-item">
             <b>Downloads: ${downloads}</b>
           </p>
         </div>
       </div></a>`;
           }).join('');

refs.galleryList.insertAdjacentHTML('beforeend',markup );

let lightbox = new SimpleLightbox('.gallery a');
}

function handleBtnClick(evt) {
  fetchImageApi.fetchImage().then(renderImageList )
}








