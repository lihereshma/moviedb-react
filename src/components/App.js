import React, { Component } from 'react'
import '../App.css'
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import MoviesList from './MoviesList'
import Pagination from './Pagination'
import MovieInfo from './MovieInfo'
import LoadingSpinner from './LoadingSpinner'

class App extends Component {
  constructor() {
    super()
  
    this.state = {
      movies: [],
      searchInput: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      loading: false
    }
    this.apiKey = process.env.REACT_APP_API
  }

  handleChange = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  handleSubmit = (e) => {
    this.setState({ loading: true}, () => {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchInput}&language=en-US`)
      .then(data => data.json())
      .then(data => {
        this.setState({ loading: false, movies: [...data.results], totalResults: data.total_results })
        if( data.total_pages === 0) {
          alert('Sorry result not found')
        }
      })
    }) 
    
    e.preventDefault()
  }

  focusPage = (pageNumber) => {
    this.setState({ loading: true}, () => {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchInput}&page=${pageNumber}&language=en-US`)
      .then(data => data.json())
      .then(data => {
        this.setState({ loading: false, movies: [...data.results], totalResults: data.total_results, currentPage: pageNumber })
      })
    })
  }

  viewMovieInfo = (id) => {
    this.setState({ loading: true}, () => {
      this.state.movies.forEach((movie, i) => {
        if(movie.id === id) {
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${this.apiKey}`)
          .then(data => data.json())
          .then(data => {
            this.setState({ loading: false, currentMovie: data })
          })
        }
      })
    }) 
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null })
  }

  render() {
    let totalPages = Math.ceil(this.state.totalResults / 20);
    return (      
      <div>
        <header>
          <div className="container">
            <Navbar />
          </div>
        </header>
        {this.state.currentMovie == null ?
        <section className="result">
          <div className="container">
            <Searchbar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            { this.state.loading ? 
              <LoadingSpinner /> :
              <div className="output">
                <MoviesList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/> 
                <div className="pag">
                  {this.state.totalResults > 20 && this.state.currentMovie == null ? <Pagination pages={totalPages} focusPage={this.focusPage} currentPage={this.state.currentPage}/> : ''}
                </div>
              </div>
            }
          </div>
        </section>
        : 
        <section className="info">
          { this.state.loading ? 
            <LoadingSpinner /> :
            <MovieInfo closeMovieInfo={this.closeMovieInfo} currentMovie={this.state.currentMovie} />
          }
        </section>
        }
      </div>
    )
  }
}

export default App;
