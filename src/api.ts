import _axios from 'axios';
import { queryI, resultI } from './types';
const PROXY = window.location.hostname === 'localhost' ? '' : '/api';

export const axios = _axios.create({
  baseURL: PROXY,
  validateStatus: (status) => status < 500,
});

export const getQuery = async (query: string) => {
  const { data } = await axios.post<queryI>('/query', {
    query,
  });
  return data;
};

export const postResult = async (result: resultI) => {
  const { data } = await axios.post('/result', result);
  return data;
};
