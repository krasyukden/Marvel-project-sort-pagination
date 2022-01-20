import React from 'react';
import { matchPath } from "react-router";
import { Dispatch, Action, AnyAction } from 'redux';
import styles from './comicsPage.module.css';
import { getComicsByCharacter } from './api';
import Preloader from './Preloader';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { connect } from 'react-redux';
import { comicsActionCreatorById, ComicsInitialState } from './redux/comicsReduser';
import { loadComicsActionCreator, ComicsState } from './redux/comicsReduser';

export interface ComicsProps {
  match: {
    params: {
      charachterId: string;
    }
  },
  comics: Array<ComicsSection>,
  loading: boolean,
  characterId: string,
  loadComicsDispatch: (characterId: string) => void
}
export interface LoadComicsAction {
  type: string,
  payload: string
}

export interface ComicsSection {
  title: string,
  id: number,
  thumbnail: {
    path: string,
    extension: string
  }
  prices: Array<PricesItem>,
  description: string
}

interface PricesItem {
  price: number
}

class ComicsPage extends React.Component<ComicsProps> {
  constructor(props: ComicsProps) {
    super(props)
  }

  componentDidMount(): void {
    const characterId = this.props?.match?.params?.charachterId;
    if (!characterId) return;
    this.props.loadComicsDispatch(characterId);
  }

  render(): JSX.Element {
    const { loading, comics } = this.props;
    return <div>
      {loading ? <Preloader /> :
        <div className={styles.wrapper}>
          <div className={styles.heroTitle}>Hero comics</div>
          <div> {comics.length > 0 ?
            <div className={styles.wrapperHeroes}>
              {comics/* .slice(0, 5) */.map((comics: ComicsSection) => {
                return <div className={styles.hero} key={comics.id}>
                  <img className={styles.heroesImg} src={comics.thumbnail.path != null
                    ? `${comics.thumbnail.path}.${comics.thumbnail.extension}` : 'Photo'} />
                  <div className={styles.heroesInfo}>
                    <div><strong>{comics.title}</strong></div>
                    <div className={styles.description}>{comics.description}</div>
                    <div>price: {comics.prices[0].price !== 0 ? `${comics.prices[0].price} usd` : ''}</div>
                  </div>
                </div>
              })}
            </div> : <div>Comics are not found</div>}
          </div>
        </div>}
    </div>
  }
}

const mapStateToProps = (state: ComicsState) => {
  return {
    comics: state.comicsPage.comics,
    loading: state.comicsPage.loading,
    error: state.comicsPage.error
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadComicsDispatch: (characterId: string) => dispatch(loadComicsActionCreator(characterId))
  }
}

const ComicsPageContainer = connect(mapStateToProps, mapDispatchToProps)(ComicsPage)

export default ComicsPageContainer;


