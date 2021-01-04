import React, { Component } from 'react';
import { StarWarsContext } from '../context';

class FilterByNumber extends Component {
  constructor() {
    super();

    this.handleInput = this.handleInput.bind(this);
    this.sendState = this.sendState.bind(this);
    this.renderColumns = this.renderColumns.bind(this);

    this.state = {
      column: 'population',
      comparison: 'maior que',
      value: '0',
    };
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  sendState(changeFilterNumber) {
    this.setState({}, () => changeFilterNumber(this.state));
  }

  renderColumns(filterColumn) {
    return (
      <div>
        <label htmlFor="column">
          <select
            name="column"
            id="column"
            data-testid="column-filter"
            onChange={ this.handleInput }
          >
            {filterColumn.map((item, index) => <option key={ index }>{item}</option>)}
          </select>
        </label>
      </div>
    );
  }

  render() {
    const options = ['maior que', 'menor que', 'igual a'];

    return (
      <StarWarsContext.Consumer>
        {({ filterColumn, changeFilterNumber }) => (
          <div>
            {this.renderColumns(filterColumn)}
            <label htmlFor="comparison">
              <select
                name="comparison"
                id="comparison"
                data-testid="comparison-filter"
                onChange={ this.handleInput }
              >
                {options.map((item, index) => <option key={ index }>{item}</option>)}
              </select>
            </label>
            <label htmlFor="value">
              <input
                id="value"
                name="value"
                type="number"
                data-testid="value-filter"
                onChange={ this.handleInput }
              />
            </label>
            <button
              type="button"
              data-testid="button-filter"
              onClick={ () => this.sendState(changeFilterNumber) }
            >
              Filtrar
            </button>
          </div>
        )}
      </StarWarsContext.Consumer>
    );
  }
}

export default FilterByNumber;
