import React from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import axios from "axios";
import { ComicsSection } from './ComicsPage';
import { Heroes } from './HomePage';

const PUBLIC_KEY = process.env.REACT_APP_API_KEY;
const hash = process.env.REACT_APP_API_HASH;
const baseURL = process.env.REACT_APP_BASEURL;

const params = {
  ts: '1',
  apikey: PUBLIC_KEY,
  hash,
  limit: 10
}

export function getComicsByCharacter(characterId: string): Promise<Array<ComicsSection>> {
  return axios.get<Array<ComicsSection>>(`${baseURL}characters/${characterId}/comics?`, { params })
    .then((response: AxiosResponse) => {
      return response.data.data.results;
    })
    .catch((error: Error | null) => {
      console.log(error);
    });
}

export function getCharacters({ isAsc, nameStartsWith, page }: any) {

  return axios.get<Array<Heroes>>(`${baseURL}characters?`,
    {
      params: {
        ...params, orderBy: isAsc ? 'name' : '-name',
        nameStartsWith, offset: (page - 1) * params.limit
      }
    })
    .then((response: AxiosResponse) => {
      const totalCount = response.data.data.total;
      const results = response.data.data.results;
      return [results, totalCount]
    })
    .catch((error: Error | AxiosError) => {
      console.log(error);
    })
}






