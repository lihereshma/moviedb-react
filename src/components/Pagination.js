import React from 'react'

function Pagination(props) {
  const pageLinks = []
  let leftSide = props.currentPage - 2;
  if(leftSide <= 0 ) leftSide=1;
  let rightSide = props.currentPage + 2;
  if(rightSide>props.pages) rightSide = props.pages;

  for (let i = leftSide; i <= rightSide; i++) {
    let active = props.currentPage === i ? 'active' : '';
    pageLinks.push(<li className={`page-number ${active}`} key={i} onClick={() => props.focusPage(i)}><a href="#FIXME">{i}</a></li>)    
  }
  return(
    <div>
      <ul className="pagination">
      { props.currentPage !== 1 ? <li onClick={() => props.focusPage(1) }><a href="#FIXME" className="button first">First</a></li> : ''}
      { props.currentPage > 1 ? <li onClick={() => props.focusPage(props.currentPage - 1)}><a href="#FIXME" className="arrows prev">Prev</a></li> : ''}
      {  pageLinks }
      { props.currentPage < props.pages ? <li onClick={() => props.focusPage(props.currentPage + 1)}><a href="#FIXME" className="arrows next">Next</a></li> : ''} 
      { props.currentPage !== props.pages ? <li onClick={() => props.focusPage(props.pages) }><a href="#FIXME" className="button last">Last</a></li> : ''}
      </ul>
    </div>
  )
}

export default Pagination
