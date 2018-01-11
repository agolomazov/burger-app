import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerconstructor.firebaseio.com/'
});

export default instance;
