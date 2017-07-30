import React from 'react';

const ResultItem = ({ city, id, onClick }) =>
  <div className="suggestion-item">
    <span>
      {id}
    </span>
    <span onClick={onClick} onMouseDown={e => e.preventDefault()}>
      {city}
    </span>
  </div>;

export default ResultItem;
