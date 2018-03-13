import React, { Component } from 'react';
import FilmListing from './FilmListing'
import FilmDetails from './FilmDetails'
import TMDB from './TMDB'

const films = TMDB.films

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      films,
      faves: [],
      current: {}
    }
    this.handleFaveToggle = this.handleFaveToggle.bind(this);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
  }

  handleFaveToggle(film) {
    const faves = this.state.faves.slice()
    const filmIndex = faves.indexOf(film)
    if (filmIndex !== -1) {
      // The film is already faved
      faves.splice(filmIndex, 1)
      console.log('removing a favorite', film.title)
    } else {
      // The film needs to be added
      faves.push(film)
      console.log('adding a favorite', film.title)
    }
    this.setState({faves})
  }

  handleDetailsClick = (film) => {
    console.log("Fetching details for " + film.title)
    const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB.api_key}&append_to_response=videos,images&language=en`
    fetch(url).then(response => {
      response.json().then(data => {
        console.log(data) // take a look at what you get back!
        this.setState({current: data})
      })
    })
  }

  render() {
    return (
      <div className="film-library">
        <FilmListing faves={this.state.faves} onDetailsClick={this.handleDetailsClick} onFaveToggle={this.handleFaveToggle} films={this.state.films} />
        <FilmDetails film={this.state.current} />
      </div>
    );
  }
}

export default App;
