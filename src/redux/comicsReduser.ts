import { ComicsSection, LoadComicsAction } from "../ComicsPage";

export const GET_COMICS_REQUEST = 'GET_COMICS_REQUEST';
export const GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS';
export const GET_COMICS_ERROR = 'GET_COMICS_ERROR';

export interface ComicsInitialState {
  comics: Array<ComicsSection>,
  loading: boolean,
  error: Error | null
}

export interface ComicsState {
  heroes: Array<ComicsSection>,
  loading: boolean,
  error: Error | null,
  comicsPage: { comics: Array<ComicsSection>; loading: boolean; error: null; }
  }

const initialState = {
  comics: [],
  loading: true,
  error: null
}

export const comicsReducer = (state: ComicsInitialState = initialState, action: LoadComicsAction | any) => {
  switch (action.type) {
    case GET_COMICS_REQUEST:
      return {
        state: initialState,
        loading: true,
        error: false
      }
    case GET_COMICS_SUCCESS:
      return {
        ...state,
        comics: action.payload,
        loading: false,
        error: false
      }
    case GET_COMICS_ERROR:
      return {
        state: initialState,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

export const comicsActionCreatorById = (comics: Array<ComicsSection>) => ({ type: GET_COMICS_SUCCESS, payload: comics })
export const loadComicsActionCreator = (characterId: string) => ({ type: GET_COMICS_REQUEST, payload: characterId })
export const errorActionCreator = (error: Error | null | any) => ({ type: GET_COMICS_ERROR, payload: error })



