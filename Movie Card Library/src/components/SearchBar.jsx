import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

class SearchBar extends Component {
  render() {
    const { onSearchTextChange, searchText } = this.props;
    const { onBookmarkedChange, bookmarkedOnly } = this.props;
    const { onSelectedGenreChange, selectedGenre } = this.props;

    return (
      <fieldset data-testid="search-bar-form">
        <div className="text-container">
          <label htmlFor="searchText" data-testid="text-input-label">Inclui o texto</label>
          <input
            name="searchText" id="filter" data-testid="text-input"
            onChange={onSearchTextChange} value={searchText}
          />
        </div>

        <div className="checkbox-container">
          <label htmlFor="bookmarkedOnly" data-testid="checkbox-input-label">
            Mostrar somente favoritos
          </label>
          <input
            name="bookmarkedOnly" id="check" data-testid="checkbox-input" type="checkbox"
            onChange={onBookmarkedChange} checked={bookmarkedOnly}
          />
        </div>
        <Select onSelectedGenreChange={onSelectedGenreChange} selectedGenre={selectedGenre} />
      </fieldset>
    );
  }
}

SearchBar.propTypes = {
  onSearchTextChange: PropTypes.func.isRequired,
  onBookmarkedChange: PropTypes.func.isRequired,
  onSelectedGenreChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  bookmarkedOnly: PropTypes.bool.isRequired,
};

export default SearchBar;
