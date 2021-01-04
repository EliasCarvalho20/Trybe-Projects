import React, { useContext } from 'react';
import { StarWarsContext } from '../context';
import './style/filters.css';

function Filters() {
  const {
    filters: { filterByNumericValues }, removeNumberFilter,
  } = useContext(StarWarsContext);
  const zero = 0;

  const renderFilters = (filter) => {
    const { column } = filter;
    return (
      <div data-testid="filter">
        {Object.values(filter).map((item, index) => <span key={ index }>{item}</span>)}
        <button
          name={ column }
          type="button"
          onClick={ ({ target: { name } }) => removeNumberFilter(name) }
        >
          Delete
        </button>
      </div>
    );
  };

  return filterByNumericValues.length !== zero && (
    <div>
      {filterByNumericValues.map((item) => renderFilters(item))}
    </div>
  );
}

export default Filters;
