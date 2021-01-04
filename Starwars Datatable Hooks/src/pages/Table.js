import React, { useContext } from 'react';

import { StarWarsContext } from '../context';
import { Loading } from '../components';

function Table() {
  const { planets, isLoading, filters } = useContext(StarWarsContext);
  const zero = 0;

  const renderTableHeader = (planet) => {
    const columns = Object.keys(planet).filter((item) => item !== 'residents');

    return (
      <tr>
        { columns.map((item, index) => <th key={ index }>{item}</th>)}
      </tr>
    );
  };

  const renderTableBody = (planet) => {
    const columns = Object.keys(planet).filter((item) => item !== 'residents');
    return (
      <tr>
        { columns.map((item, index) => {
          if (item === 'name') {
            return <td data-testid="planet-name" key={ index }>{planet[item]}</td>;
          }
          return <td key={ index }>{planet[item]}</td>;
        })}
      </tr>
    );
  };

  const filterByNumber = (numberFilters) => {
    const lastIndex = numberFilters.length - 1;
    const { column, comparison, value } = numberFilters[lastIndex];

    const operator = {
      'maior que': (a, b) => Number(a) > Number(b),
      'menor que': (a, b) => Number(a) < Number(b),
      'igual a': (a, b) => Number(a) === Number(b),
    };

    return planets.filter((planet) => {
      if (operator[comparison](planet[column], value) && planet[column] !== 'unknown') {
        return planet;
      }
      return undefined;
    });
  };

  const handleFilter = () => {
    const { filterByNumericValues, filterByName: { name } } = filters;

    if (name) {
      return planets.filter((item) => (
        item.name.toLowerCase().includes(name.toLowerCase())
      ));
    }

    if (filterByNumericValues.length !== zero) {
      return filterByNumber(filterByNumericValues);
    }

    return undefined;
  };

  if (isLoading) {
    return (<Loading />);
  }

  return planets.length !== zero && (
    <table>
      <thead>
        {renderTableHeader(planets[0])}
      </thead>
      <tbody>
        {handleFilter() === undefined ? planets.map((item) => renderTableBody(item))
          : handleFilter().map((item) => renderTableBody(item))}
      </tbody>
    </table>
  );
}

export default Table;
