import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_TMDB;
const BASE_URL = import.meta.env.VITE_URL_TMDB;

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export default client;