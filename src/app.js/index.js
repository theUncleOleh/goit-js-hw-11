import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const BASE_URL = 'https://pixabay.com/api/';
const pixabayKey = '24437827-e20f686b1c65a4a2859f17630'
const refs = {
    searchForm: document.querySelector('.search-form'),
    galleryList: document.querySelector('.gallery'),
}



refs.searchForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(evt) {
   evt.preventDefault()
    const searchData = evt.currentTarget.elements.searchQuery.value;
   
   getImagine(searchData).then(images => renderImageList(images)).catch(error => console.log("Error"));

}



function getImagine (searchData)  {
   
    return axios.get(`${BASE_URL}?key=${pixabayKey}&q=${searchData}&image_type=photo&orientation=horizontal&safesearch=true`)
    

      }
  


function renderImageList (images) {
    const markup = images.data.hits.map((image) => {
        return  `<div class="photo-card">
         <a class="photo-link" href="${image.largeImageURL}"><img src="${image.webformatURL}" width="640" height="427"  alt="${image.tags}" loading="lazy" /></a>
         <div class="info">
           <p class="info-item">
             <b>Likes: ${image.likes}</b>
           </p>
           <p class="info-item">
             <b>Views: ${image.views}</b>
           </p>
           <p class="info-item">
             <b>Comments: ${image.comments}</b>
           </p>
           <p class="info-item">
             <b>Downloads: ${image.downloads}</b>
           </p>
         </div>
       </div>`;
           }).join('');

refs.galleryList.insertAdjacentHTML('beforeend',markup );
}

const lightbox = new SimpleLightbox('.gallery a', { /* options */ });
console.log(lightbox);



