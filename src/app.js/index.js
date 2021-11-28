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
refs.loadMore.addEventListener('click', handleBtnClick);
refs.loadMore.style.display = 'none';

let totalHits = 0;

function handleFormSubmit(evt) {
   evt.preventDefault();
   clearGalleryList();
   refs.loadMore.style.display = 'none';
   
   fetchImageApi.searchQuery = evt.currentTarget.elements.searchQuery.value;
   fetchImageApi.resetPage();
  
   fetchImageApi.fetchImage().then(data=> { 
    totalHits = 100;
    console.log(totalHits)
     
     
      if (data.hits.length < 1) {
        return  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            } 
            Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`)
            refs.loadMore.style.display = 'block'; 
          return renderImageList (data);
    });
   
    
        
          
        } 

    







function renderImageList (data) {
  
    const markup = data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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

function handleBtnClick(data) {
  
   totalHits = 100;
   if(data > totalHits){
    return Notiflix.Notify.warning("aaaaaaaaaaaaaaaaaa");
    
      }
 return fetchImageApi.fetchImage().then(renderImageList);

 
  }

function clearGalleryList (){
refs.galleryList.innerHTML = "";
}








