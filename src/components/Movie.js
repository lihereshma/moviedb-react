import React from 'react';

function Movie(props) {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 col-12 mb-4">
      <div className="card">
        <div className="card-image">
          { 
            <img
            alt={props.altImage}
            src={props.image == null ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg' :`http://image.tmdb.org/t/p/w185${props.image}`}
            />
          }
          <div className="card-content link">
            <a href="#FIXME" onClick={() => props.viewMovieInfo(props.movieId)}>view details</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
