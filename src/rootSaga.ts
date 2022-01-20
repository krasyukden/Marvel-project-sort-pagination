import { watchLoadComicsSaga } from './comicsSaga';
import { watchLoadHeroesSaga } from './heroesSaga';
import { all } from 'redux-saga/effects';

export function* rootSaga(): Generator {
  yield all([
    watchLoadHeroesSaga(), 
    watchLoadComicsSaga()
  ]);
}

