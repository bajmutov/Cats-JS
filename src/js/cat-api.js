import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_aFxrmpRv82VeSWgijkqABFsKSLKbVO1qN3Ww0fV1TokfQ5Ux99CfloNQrLEGDSzo';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get(`${BASE_URL}/breeds`);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`);
}
