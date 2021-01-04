import React, { useContext } from 'react';
import { StarWarsContext } from '../context';

function FilterByName() {
  const { planets, filters, changeFilterName } = useContext(StarWarsContext);
  const { filterByName: { name } } = filters;
  const zero = 0;

  return planets.length !== zero && (
    <div>
      <label htmlFor="filter">
        Procurar:
        <input
          id="filter"
          name="filter"
          type="text"
          value={ name }
          data-testid="name-filter"
          onChange={ ({ target: { value } }) => changeFilterName(value) }
        />
      </label>
    </div>
  );
}

export default FilterByName;
