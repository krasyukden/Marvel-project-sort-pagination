import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { take, takeEvery, takeLatest, takeLeading, put, call, all } from 'redux-saga/effects';
import { Dispatch, Action, AnyAction } from 'redux';
import { getComicsByCharacter } from "./api";
import { ComicsSection, ComicsProps, LoadComicsAction } from "./ComicsPage";
import { errorActionCreator, GET_COMICS_REQUEST } from "./redux/comicsReduser";
import { comicsActionCreatorById } from "./redux/comicsReduser";
import React from 'react';
import { matchPath } from "react-router";
import { Provider } from 'react-redux';
import { sagaMiddleware } from "./redux/store";

function* workerComicsSaga(action: LoadComicsAction): Generator {
  try {
    const comics = yield call(getComicsByCharacter, action.payload);
    yield put(comicsActionCreatorById(comics as ComicsSection[]))
  } catch (error) {
    yield put(errorActionCreator(error));
  }
}

export function* watchLoadComicsSaga(): Generator {
  yield takeEvery(GET_COMICS_REQUEST, workerComicsSaga)
}


