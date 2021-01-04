import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import getPlanets from '../services/api';
import StarWarsContext from './StarWarsContext';

const INITIAL_FILTER = {
  filterByName: { name: '' },
  filterByNumericValues: [],
  order: {
    column: 'name',
    sort: 'ASC',
  },
};

const COLUMNS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilter] = useState(INITIAL_FILTER);
  const [filterColumn, setColumn] = useState(COLUMNS);

  const getPlanetsFromApi = async () => {
    setIsLoading(true);
    const planetsFromApi = await getPlanets();
    setPlanets(planetsFromApi.results);
    setIsLoading(false);
  };

  useEffect(() => {
    getPlanetsFromApi();
  }, []);

  useEffect(() => { }, [filters]);

  const changeFilterName = (text) => {
    const name = text;
    setFilter({ ...filters, filterByName: { name } });
  };

  const changeFilterNumber = (numericFilters) => {
    const { column } = numericFilters;
    const newColumns = filterColumn.filter((item) => item !== column);

    setFilter({
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.concat(numericFilters),
    });
    setColumn(newColumns);
  };

  const removeNumberFilter = (filterToRemove) => {
    const { filterByNumericValues } = filters;
    const newFilter = filterByNumericValues.filter((item) => (
      item.column !== filterToRemove
    ));

    setColumn(filterColumn.concat(filterToRemove));
    setFilter({
      ...filters,
      filterByNumericValues: newFilter,
    });
  };

  const reorderPlanets = ({ order: { column, sort } }) => {
    setFilter({
      ...filters,
      order: { column, sort },
    });

    const compareString = {
      ASC: (a, b, isNumeric) => a.localeCompare(b, undefined, { numeric: isNumeric }),
      DESC: (a, b, isNumeric) => b.localeCompare(a, undefined, { numeric: isNumeric }),
    };

    planets.sort((a, b) => {
      if (Number.isNaN(Number(a[column])) && a[column] !== 'unknown') {
        return compareString[sort](
          a[column].toLowerCase(), b[column].toLowerCase(), false,
        );
      }
      return compareString[sort](a[column], b[column], true);
    });
  };

  useEffect(() => {
    reorderPlanets({ order: { column: 'name', sort: 'ASC' } });
  }, [planets]);

  const context = {
    planets,
    isLoading,
    filters,
    filterColumn,
    changeFilterName,
    changeFilterNumber,
    removeNumberFilter,
    reorderPlanets,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      { children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = { children: PropTypes.objectOf().isRequired };

export default StarWarsProvider;
