import React from 'react'

function Searchbar(props) {
  return (
    <div>
      <form className="row justify-content-center" action="index.html" onSubmit={ props.handleSubmit }>
        <div className="form-input col-lg-4 col-11">
          <input className="form-control" type="text" placeholder="Search here by title..." onChange={ props.handleChange }/>
        </div>
      </form>
    </div>
  )
}

export default Searchbar
