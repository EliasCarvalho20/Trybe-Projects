import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddMovie extends Component {
  constructor() {
    super();

    this.resetPropsValue = this.resetPropsValue.bind(this);
    this.inputChange = this.inputChange.bind(this);

    this.state = {
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    };
  }

  inputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  resetPropsValue(event) {
    event.preventDefault();

    this.props.onClick(this.state);

    this.setState({
      subtitle: '',
      title: '',
      imagePath: '',
      storyline: '',
      rating: 0,
      genre: 'action',
    });
  }

  render() {
    const ELEMENTS = [
      ['title', 'title-input-label', 'title-input', 'Título',],
      ['subtitle', 'subtitle-input-label', 'subtitle-input', 'Subtítulo',],
      ['imagePath', 'image-input-label', 'image-input', 'Imagem',],
      ['storyline', 'storyline-input-label', 'storyline-input', 'Sinopse',],
      ['rating', 'rating-input-label', 'rating-input', 'Avaliação',]
    ];

    return (
      <fieldset data-testid="add-movie-form">
        {ELEMENTS.map((element) => (
          <label
            key={element[0]}
            htmlFor={element[0]}
            data-testid={element[1]}
          >
            {element[3]}
            <input
              name={element[0]}
              id={element[0]}
              type={element[0] === 'rating' ? 'number' : 'text'}
              data-testid={element[2]}
              value={this.state[element[0]]}
              onChange={this.inputChange}
            />
          </label>
        ))}

        <label htmlFor="genre" data-testid="genre-input-label">Gênero</label>
        <select
          name="genre" id="genre" data-testid="genre-input"
          onChange={this.inputChange} value={this.state.genre}
        >
          <option data-testid="genre-option" value="action">Ação</option>
          <option data-testid="genre-option" value="comedy">Comédia</option>
          <option data-testid="genre-option" value="thriller">Suspense</option>
        </select>

        <button data-testid="send-button" type="button" onClick={this.resetPropsValue}>
          Adicionar filme
        </button>
      </fieldset>
    );
  }
}

AddMovie.propTypes = { onClick: PropTypes.func.isRequired };

export default AddMovie;
