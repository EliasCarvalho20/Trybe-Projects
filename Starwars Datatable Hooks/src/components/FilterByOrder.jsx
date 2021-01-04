import React, { Component } from 'react';
import { StarWarsContext } from '../context';

class FilterByOrder extends Component {
  constructor() {
    super();

    this.renderColumns = this.renderColumns.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.sendFilterToProvider = this.sendFilterToProvider.bind(this);

    this.state = {
      order: {
        column: 'name',
        sort: 'ASC',
      },
    };
  }

  handleInput({ target: { name, value } }) {
    this.setState((previous) => ({
      order: { ...previous.order, [name]: value },
    }));
  }

  sendFilterToProvider(reorderPlanets) {
    this.setState({}, () => reorderPlanets(this.state));
  }

  renderColumns(planet) {
    const columns = Object.keys(planet).filter((item) => item !== 'residents');

    return (
      <div>
        <label htmlFor="column">
          <select
            id="column"
            name="column"
            type="text"
            data-testid="column-sort"
            onChange={ this.handleInput }
          >
            {columns.map((item, index) => <option key={ index }>{item}</option>)}
          </select>
        </label>
      </div>
    );
  }

  render() {
    const zero = 0;

    return (
      <StarWarsContext.Consumer>
        {({ planets, reorderPlanets }) => (
          planets.length !== zero
          && (
            <div>
              {this.renderColumns(planets[0])}
              <label htmlFor="ASC">
                ASC
                <input
                  type="radio"
                  name="sort"
                  id="ASC"
                  value="ASC"
                  data-testid="column-sort-input-asc"
                  onChange={ this.handleInput }
                />
              </label>
              <label htmlFor="DESC">
                DESC
                <input
                  type="radio"
                  name="sort"
                  id="DESC"
                  value="DESC"
                  data-testid="column-sort-input-desc"
                  onChange={ this.handleInput }
                />
              </label>
              <button
                type="button"
                data-testid="column-sort-button"
                onClick={ () => this.sendFilterToProvider(reorderPlanets) }
              >
                Filtrar
              </button>
            </div>
          )
        )}
      </StarWarsContext.Consumer>
    );
  }
}

export default FilterByOrder;
