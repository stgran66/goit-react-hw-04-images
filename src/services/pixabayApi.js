import axios from 'axios';

const PIXABAY_KEY = '29209945-1fb6dc06427a139c565976a83';
axios.defaults.baseURL = `https://pixabay.com/api`;

export const getImages = async (query, perPage, page = 1) => {
  const searchParams = new URLSearchParams({
    key: PIXABAY_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });
  const response = await axios.get(`?${searchParams}`);
  return response.data;
};
