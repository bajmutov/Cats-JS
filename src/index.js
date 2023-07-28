import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectBreedEl = document.querySelector('.breed-select');
const loaderTextEl = document.querySelector('.loader');
const errorTextEl = document.querySelector('.error');
const listInfoEl = document.querySelector('.cat-info');

// fetchBreeds().then(data => console.log(data));

errorTextEl.classList.add('is-hidden');
loaderTextEl.classList.remove('is-hidden');
selectBreedEl.classList.add('is-hidden');
listInfoEl.classList.add('is-hidden');

selectBreedEl.addEventListener('change', handleSelectSubmit);

breedInSelectAdd();

function handleSelectSubmit() {
  listInfoEl.classList.add('is-hidden');
  loaderTextEl.classList.remove('is-hidden');

  const breedId = selectBreedEl.value;
  fetchCatByBreed(breedId)
    .then(response => {
      createGalleryCard(response.data);

      listInfoEl.classList.remove('is-hidden');
      loaderTextEl.classList.add('is-hidden');
    })
    .catch(err => {
      loaderTextEl.classList.add('is-hidden');
      errorTextEl.classList.remove('is-hidden');

      Notify.failure(`❌${err.message}❌`);
    });
}

function breedInSelectAdd() {
  loaderTextEl.classList.remove('is-hidden');

  return fetchBreeds()
    .then(response => {
      response.data.map(cat => {
        let selectedOptionValue = selectBreedEl.value;
        selectedOptionValue = cat.id;
        let selectedOptionText =
          selectBreedEl.options[selectBreedEl.selectedIndex];
        selectedOptionText = cat.name;

        let newOption = new Option(selectedOptionText, selectedOptionValue);
        selectBreedEl.append(newOption);
      });

      new SlimSelect({
        select: '.breed-select',
      });

      loaderTextEl.classList.add('is-hidden');
      selectBreedEl.classList.remove('is-hidden');
    })
    .catch(err => {
      loaderTextEl.classList.add('is-hidden');
      errorTextEl.classList.remove('is-hidden');

      Notify.failure(`❌ ${err.message} ❌`);
    });
}

function createGalleryCard(cats) {
  const markup = cats
    .map((cat, index) => {
      return `<img class="img-cat" src="${cat.url}" alt="${cat.breeds[index].name} width="540" height="360">
      <div class="div-text-cat">
      <p class="text-cat"><b>Description</b>: ${cat.breeds[index].description}</p>
      <p class="text-cat"><b>Temperament</b>: ${cat.breeds[index].temperament}</p>
      </div>
      `;
    })
    .join('');
  listInfoEl.innerHTML = markup;
}
