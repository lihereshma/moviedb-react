import React from 'react';
import Movie from './Movie'

function MoviesList(props) {
  return ( 
    <div className="container-fluid">    
      <div className="row">   
          {
            props.movies.map((movie, i) => {
              return (
                <Movie key={i} viewMovieInfo={props.viewMovieInfo} movieId={movie.id} image={movie.poster_path} altImage={movie.title} />                    
              )
            })
          }
      </div>
    </div>
  )
}

export default MoviesList;
