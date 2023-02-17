import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './MovieDetails.css';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      movie: [],
    };
  }

  componentDidMount() {
    const { match: { params: { movieId } } } = this.props;

    movieAPI.getMovie(movieId)
      .then((movie) => {
        this.setState({
          status: 'loaded',
          movie,
        });
      });
  }

  render() {
    const { status, movie } = this.state;
    if (status === 'loading') return <Loading />;

    const {
      title, storyline, imagePath, genre, rating, subtitle,
    } = movie;
    const { match: { params: { movieId } } } = this.props;

    return (
      <div className="container">
        <header>
          <img alt="Movie Cover" src={ `../${imagePath}` } />
        </header>
        <h1 className="card-title">
          {title}
          {' '}
          {subtitle}
        </h1>

        <div className="card-content">
          <p>{`Sinopse: ${storyline}`}</p>
          <p>{`Genre: ${genre}`}</p>
          <p>{`Rating: ${rating}`}</p>
        </div>

        <div className="card-action">
          <Link to={ `/movies/${movieId}/edit` }>Editar </Link>
          <Link to="/">Voltar</Link>
        </div>

      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieDetails;
