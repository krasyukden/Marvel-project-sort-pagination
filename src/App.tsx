import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFoundPage from './NotFoundPage';
import ComicsPageContainer from './ComicsPage';
import HomePage from './HomePage';
import store from "./App";
import { Provider } from 'react-redux';
import HomePageContainer from './HomePage';


class App extends React.Component {
  render(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route path='/comics/:charachterId' component={ComicsPageContainer} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}

export default App;

