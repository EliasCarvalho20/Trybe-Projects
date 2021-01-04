import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const { onSelectedGenreChange, selectedGenre } = this.props;

    return (
      <div className="checkbox-container">
        <label htmlFor="selectedGenre" data-testid="select-input-label">Filtrar por gênero</label>
        <select
          name="selectedGenre" id="options" data-testid="select-input"
          onChange={onSelectedGenreChange} value={selectedGenre}
        >
          <option data-testid="select-option" value="">Todos</option>
          <option data-testid="select-option" value="action">Ação</option>
          <option data-testid="select-option" value="comedy">Comédia</option>
          <option data-testid="select-option" value="thriller">Suspense</option>
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  onSelectedGenreChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
};

export default Select;
