import { Heroes } from '../HomePage';
import { Action, Reducer } from 'redux';
export const GET_HEROES_SUCCESS = 'GET_HEROES_SUCCESS';
export const GET_HEROES_REQUEST = 'GET_HEROES_REQUEST';
export const GET_HEROES_ERROR = 'GET_HEROES_ERROR';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';

export interface HeroesInitialState {
  heroes: Array<Heroes>,
  loading: boolean,
  error: Error | null,
  totalCount: number
}

export interface HeroesAction {
  type: string,
  payload: Array<Heroes>
}

export interface HeroesState {
  heroes: Array<Heroes>,
  loading: boolean,
  error: Error | null,
  heroesPage: { heroes: Array<Heroes>; loading: boolean; error: null; currentPage: number; totalCount: number }
}
export interface HeroesAction {
  type: string,
  payload: Array<Heroes>
}

const initialState = {
  heroes: [],
  loading: true,
  error: null,
  totalCount: 0,
  currentPage: 1
}

export const heroesReducer = (state: HeroesInitialState = initialState, action: any) => {
  switch (action.type) {
    case GET_HEROES_SUCCESS:
      return {
        ...state,
        heroes: action.payload,
        loading: false,
        error: false
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        loading: false,
        error: false
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.count,
        error: false
      }
    case GET_HEROES_ERROR:
      return {
        state: initialState,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export const heroesActionCreator = (heroes: Array<Heroes>) => ({ type: GET_HEROES_SUCCESS, payload: heroes })
export const loadingHeroesActionCreator = (payload: any) =>
  ({ type: GET_HEROES_REQUEST, payload })
export const errorHeroesActionCreator = (error: Error | null | any) => ({ type: GET_HEROES_ERROR, payload: error })


export const setCurrentPageActionCreator = (currentPage: number) =>
  ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalCountActionCreator = (totalCount: number) =>
  ({ type: SET_TOTAL_COUNT, count: totalCount })