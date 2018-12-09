import React from 'react';

const Genre = (props) => {
  return (
    <div className="item">
      <div className="ui checkbox">
        <input type="checkbox" 
          name="genre" 
          value={ props.id } 
          id={ `genre-${props.id}` } 
          onChange={ ev => ev.target.checked ? props.onSelected(props.id) : props.onRemoved(props.id) } />
        <label htmlFor={ `genre-${props.id}` }>{ props.name }</label>
      </div>
    </div>
  );
}

export default Genre;