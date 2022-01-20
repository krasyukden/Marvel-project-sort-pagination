import { takeEvery, put, call, fork, all } from 'redux-saga/effects';
import { getCharacters } from './api';
import { Heroes, LoadHerosAction, HomeState } from './HomePage';
import { errorHeroesActionCreator, heroesActionCreator, setTotalCountActionCreator } from './redux/heroesReduser';
import { GET_HEROES_REQUEST } from './redux/heroesReduser';

interface Response {
  heroes: Array<Heroes>,
  totalCount: number
}

export function* heroesSaga(action: LoadHerosAction): Generator {
  try {
    const [heroes, totalCount]: any = yield call(getCharacters, action.payload);
    yield put(heroesActionCreator(heroes as Heroes[]))
    yield put(setTotalCountActionCreator(totalCount))// 
  } catch (error) {
    yield put(errorHeroesActionCreator(error));
  }
}
export function* watchLoadHeroesSaga(): Generator {
  yield takeEvery(GET_HEROES_REQUEST, heroesSaga)
}



