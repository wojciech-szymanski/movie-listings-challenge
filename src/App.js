import React, { Component } from 'react';
import Movie from './components/Movie';

class App extends Component {
  state = {
    movies: [],
    apiKey: 'd11b3e371a1df4e9452d682d25f7c2fc'
  }

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.state.apiKey}&language=en-US&page=1`)
      .then(res => res.json())
      .then(movieData => {
        this.setState({
          movies: movieData.results
        });
      })
      .catch(err => {
        console.log(err);
      });
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
              <div className="ui three column grid">
                  {
                      this.state.movies.map((movie, idx) =>
                          <Movie key={ idx }
                              { ...movie } />
                      )
                  }
              </div>
          </main>
      </div>
    );
  }
}

export default App;
