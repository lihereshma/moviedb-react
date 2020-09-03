import React from 'react'

function MovieInfo(props) {
  const currentMovie = props.currentMovie;

  const genreNames = [];
  if (currentMovie.genres) {
    currentMovie.genres.forEach(function(genre) {
      genreNames.push(genre.name);
    });
  }
  const genreString = [];
  for (let i = 0; i < genreNames.length; i++) {
    genreString.push(<li className="status">{genreNames[i]}</li>);  
  }

  const langNames = [];
  if (currentMovie.spoken_languages) {
    currentMovie.spoken_languages.forEach(function(lang) {
      langNames.push(lang.name);
    });
  }
  let langString = langNames.join(", ");

  const productionCompanies = [];
  if(currentMovie.production_companies){
    currentMovie.production_companies.forEach(function(company){
      productionCompanies.push(company.name);
    }); 
  }
  let companyString = productionCompanies.join(', ');

  const productionCountries = [];
  if(currentMovie.production_countries){
    currentMovie.production_countries.forEach(function(country){
      productionCountries.push(country.name);
    }); 
  }
  let countries = productionCountries.join(', ');

  function formatRuntime(runtime) {
    const minutes = runtime % 60;
    const hours = Math.floor(runtime / 60);
    return (`${hours} ${hours>1?'hours':'hour'} ${minutes} minutes`);
  }


  function formatDate(date) {
    const dateArray = date.split('-').reverse();
    const day = dateArray[0];
    let month ='';
    switch(parseInt(dateArray[1])){
      case 1: month = 'Jan'; break;
      case 2: month = 'Feb'; break;
      case 3: month = 'Mar'; break;
      case 4: month = 'Apr'; break;
      case 5: month = 'May'; break;
      case 6: month = 'Jun'; break;
      case 7: month = 'Jul'; break;
      case 8: month = 'Aug'; break;
      case 9: month = 'Sep'; break;
      case 10: month = 'Oct'; break;
      case 11: month = 'Nov'; break;
      case 12: month = 'Dec'; break;
      default: month = '';
    }
    const year = dateArray[2];
    return `${day} ${month} ${year}`;
  }

  return (
    <div className="container">
      <div className="row justify-content-center" onClick={props.closeMovieInfo}>
        <div className="col-11">
          <a className="backArrow" href="#FIXME">go back</a>
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-lg-4 col-md-6 col-sm-12 col-11 mr-lg-5 mb-5 poster">
          <figure>
          <img
            alt={currentMovie.title}
            src={currentMovie.poster_path == null ? 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg' :`http://image.tmdb.org/t/p/w185${currentMovie.poster_path}`}
          />
          </figure>           
        </div>
        <div className="col-lg-7 col-11 details">
          <ul>
            <li className="title">
              <span>{currentMovie.title}</span>
            </li>
            <li className="time">
              <p>
              {formatRuntime(currentMovie.runtime)} <span>&#124;</span> {formatDate(currentMovie.release_date)}
            </p>
            </li>
            <li>
              <ul className="genres">{genreString}</ul>
            </li>
            <li>
              <ul className="row vote">
                <li className="col-lg-4 col-sm-12 mb-4">
                  <h3>Language</h3>
                  <span>{langString}</span>
                </li>                
                <li className="col-lg-3 col-sm-12 mb-4">
                  <h3>Rating</h3>
                  <span>{Math.ceil(currentMovie.vote_average)} &#47; 10</span>
                </li>
                <li className="col-lg-5 col-sm-12">
                  <h3>Box Office</h3>
                  <div>
                    <h4>Revenue:</h4><span>${currentMovie.revenue}</span>
                  </div>
                  <div>
                    <h4>Budget:</h4><span>${currentMovie.budget}</span>
                  </div>
                </li>
              </ul>  
            </li>
            <li>
              <h3>{currentMovie.tagline}</h3>
              <p>{currentMovie.overview}</p>
            </li>
            <li>
              <h3>Company Credits</h3>
              <p>{companyString}</p>
            </li>
            <li>
              <h3>Countries</h3>
              <p>{countries}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MovieInfo
