import axios from 'axios';

const API_KEY = '29209945-1fb6dc06427a139c565976a83';
axios.defaults.baseURL = `https://pixabay.com/api`;

export const getImages = async query => {
  const response = await axios.get(`?key=${API_KEY}&q=${query}`);
  return response.data;
};

// https://pixabay.com/api/videos/?key=29209945-1fb6dc06427a139c565976a83&q=yellow+flowers
