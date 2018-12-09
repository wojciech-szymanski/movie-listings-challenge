import React, { Component } from 'react';
import Genre from './components/Genre';
import Movie from './components/Movie';

const apiConfig = {
  apiKey: 'd11b3e371a1df4e9452d682d25f7c2fc',
  baseURL: 'https://api.themoviedb.org/3'
}

class App extends Component {
  state = {
    movies: [],
    genres: [],
    filter: {
      genres: []
    }
  }

  fetchData = (href, callback) => {
    fetch(`${apiConfig.baseURL}${href}?api_key=${apiConfig.apiKey}&language=en-US&page=1`)
      .then(res => res.json())
      .then(callback)
      .catch(err => {
        console.log(err);
      });
  }

  loadMovieData = () => {
    this.fetchData('/movie/now_playing', movieData => {
      if (movieData.results) {
        this.setState({
          movies: movieData.results.map(movie => ({
            ...movie,
            visible: true
          }))
        });
      }
    });
  }

  loadGenreData = () => {
    this.fetchData('/genre/movie/list', genreData => {
      if (genreData.genres) {
        this.setState({
          genres: genreData.genres
        });
      }
    });
  }

  genreSelected = id => {
    this.setState({
      filter: {
        genres: this.state.filter.genres.concat(id)
      }
    }, this.filterMovieList);
  }

  genreRemoved = id => {
    this.setState({
      filter: {
        genres: this.state.filter.genres.filter(genreId => !(genreId === id))
      }
    }, this.filterMovieList);
  }

  filterMovieList = () => {
    this.setState({
      movies: this.state.movies.map(movie => ({
        ...movie,
        visible: this.state.filter.genres.every(genreId => movie.genre_ids.includes(genreId))
      }))
    });
  }

  componentDidMount() {
    this.loadMovieData();
    this.loadGenreData();
  }

  render() {
    return (
      <div className="ui main container">
          <header className="ui dividing header">
              <div className="ui one column grid">
                  <div className="column">
                      <h1>Movie list</h1>
                  </div>
              </div>
          </header>
          <main>
            <div className="ui grid">
              <div className="four wide column">  
                <div className="ui list">
                  {
                    this.state.genres.map(genre =>
                      <Genre key={`genre-${genre.id}`}
                        onSelected={ this.genreSelected }
                        onRemoved={ this.genreRemoved }
                        { ...genre } />
                    )
                  }
                </div>
              </div>
              <div className="twelve wide column">              
                <div className="ui four column grid">
                    {
                      this.state.movies
                        .filter(movie => movie.visible)
                        .map((movie, idx) =>
                          <Movie key={`movie-${idx}`}
                            genres={ this.state.genres }
                            { ...movie } />
                        )
                    }
                </div>
              </div>
            </div>
          </main>
      </div>
    );
  }
}

export default App;
