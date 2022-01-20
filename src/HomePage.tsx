import { render } from '@testing-library/react';
import { resolve } from 'dns';
import React from 'react';
import { Dispatch, Action, AnyAction } from 'redux';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { getCharacters } from './api';
import Preloader from './Preloader';
import styles from './homePage.module.css';
import logo from './common/Marvel_Studios_logo.png';
import noHeroImg from './common/transparent.png';
import { HeroesInitialState, loadingHeroesActionCreator } from './redux/heroesReduser';
import { HeroesState, setCurrentPageActionCreator, setTotalCountActionCreator } from './redux/heroesReduser';
import queryString from 'query-string';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export interface HomeState {
  heroes: Array<Heroes>,
  loading: boolean,
  inputValue: string,
  location: RouteComponentProps['location'],
  history: RouteComponentProps['history']
  loadingHeroesDispatch: any,
  setCurrentPageDispatch: (pageNumber: number) => void,
  setTotalCountDispatch: (totalCount: number) => void,
  totalCount: number,
  isAsc: boolean,
  pagesCount: number,
  currentPage: number,
  pages: Array<number>
}

export interface LoadHerosAction {
  type: string,
  payload: string
}

export interface HomeProps {
  inputValue: string,
  isAsc: boolean
}

export interface Heroes {
  id: number,
  name: string,
  thumbnail: {
    path: string,
    extension: string
  },
  description: string
}

class HomePage extends React.Component<HomeState, HomeProps, HeroesInitialState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      isAsc: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }



  loadFromServer(pageNumber?: number) {
    const parsed: string | queryString.ParsedQuery<string> = queryString.parse(this.props.location.search);
    const { query, page } = parsed;
    const nameCharacter = query?.toString();

    this.props.loadingHeroesDispatch({
      ...(nameCharacter && { nameStartsWith: nameCharacter }),
      isAsc: this.state.isAsc, page: pageNumber || page
    });
    if (nameCharacter) { this.setState({ inputValue: nameCharacter }) }

    this.props.setTotalCountDispatch(this.props.totalCount);

  }

  componentDidMount(): void {
    this.loadFromServer()
  }


  componentDidUpdate(prevProps: any, prevState: any): void {
    if (this.props.location !== prevProps.location) {
      this.loadFromServer();
    }
    if (this.state.isAsc !== prevState.isAsc) {
      this.loadFromServer();
    }
  }

  handleSubmit(): void {
    if (this.state.inputValue) {
      this.props.history.push(`?query=${this.state.inputValue}`)
    } else {
      this.props.history.push(`/`)
    }
  }

  handleSort() {
    this.setState((prevState: any) => ({ isAsc: !prevState.isAsc }))
  }

  handleChange(e: any): void {
    const target = e.target;
    const value: string = target.value;
    this.setState({
      inputValue: value
    })
  }

  render(): JSX.Element {

    const pagesCount: number = Math.ceil(this.props.totalCount / 10);
    const pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    const { loading, heroes } = this.props;
    return <div>
      {loading ? <Preloader /> :
        <div className={styles.wrapper}>
          <img src={logo} alt='logo' className={styles.logo} />
          <div className={styles.wrapperInput}>
            <div>
              <input type='text' className={styles.inputSearch}
                value={this.state.inputValue} name="inputValue" onChange={this.handleChange} />
            </div>
            <Button variant="contained" type="submit" className={styles.sortBy} onClick={this.handleSort}
            >Sort by</Button>
            <Button variant="contained" type="submit" className={styles.search} onClick={this.handleSubmit}>
              Search</Button>
          </div>
          <div> {heroes.length > 0 ? <div className={styles.wrapperHeroes}>
            {heroes.map((hero: Heroes) => {
              return <div key={hero.id}>
                <div className={styles.hero}>
                  <Avatar alt="Photo" sx={{ width: 100, height: 100, margin: 5 }}
                    className={styles.avatarStyle} src={hero.thumbnail.path != null
                      ? `${hero.thumbnail.path}.${hero.thumbnail.extension}` : 'Photo'} />
                  <div className={styles.name}>{hero.name}</div>
                  <div className={styles.description} >{hero.description}</div>
                  <NavLink to={`/comics/${hero.id}`} style={{ textDecoration: 'none' }}>
                    {<Button variant="contained"
                    sx={{ marginRight: 5, textDecoration: 'none' }}
                    type="submit"  >See more</Button>} </NavLink>
                </div>
              </div>
            })}
          </div> : <div>
            <div className={styles.noHero}>Characters with name `{this.state.inputValue}` not found</div>
            <img src={noHeroImg} alt='noHeroImg' className={styles.noHeroImg} /> </div>}
          </div>
          <Stack spacing={2}>
            <Pagination count={pagesCount} onChange={(event: React.ChangeEvent<unknown>, page: number) => { this.loadFromServer(page) }} />
          </Stack>
        </div>}
    </div>
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    loadingHeroesDispatch: (params: any) => dispatch(loadingHeroesActionCreator(params)),
    setCurrentPageDispatch: (pageNumber: number) => dispatch(setCurrentPageActionCreator(pageNumber)),
    setTotalCountDispatch: (totalCount: number) => dispatch(setTotalCountActionCreator(totalCount))
  }
}


const mapStateToProps = (state: HeroesState) => {
  return {
    heroes: state.heroesPage.heroes,
    loading: state.heroesPage.loading,
    error: state.heroesPage.error,
    totalCount: state.heroesPage.totalCount,
    currentPage: state.heroesPage.currentPage

  }
}
const HomePageContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export default HomePageContainer;


