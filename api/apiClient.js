import axios from 'axios';
import {getTokenFromStorage} from '../Utils/TokenStorage';

const API_ENDPOINT = 'http://192.168.205.237:8080/';
const getapiClient = async () => {
  let token = '';
  token = await getTokenFromStorage();
  console.log(token);

  return axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? 'Bearer ' + token : null,
    },
  });
};

export default getapiClient;
