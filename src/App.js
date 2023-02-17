import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import {
  EditMovie, MovieDetails, MovieList, NewMovie, NotFound,
} from './pages';
import data from './services/movieData';

function App() {
  localStorage.setItem('movies', JSON.stringify(data));

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ MovieList } />
        <Route path="/movies/new" component={ NewMovie } />
        <Route path="/movies/:movieId/edit" component={ EditMovie } />
        <Route path="/movies/:movieId" component={ MovieDetails } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  );
}

export default App;
