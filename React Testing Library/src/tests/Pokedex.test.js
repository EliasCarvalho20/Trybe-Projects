import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Test if the next pokemon is displayed when the button is clicked.', () => {
  it('The button must contain the text: Próximo pokémon', () => {
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Encountered pokémons');
    const buttonNext = getByText('Próximo pokémon');
    expect(buttonNext).toBeInTheDocument();
  });

  it('The next Pokémons in the list should be shown, one by one', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const buttonNext = getByText('Próximo pokémon');
    const pokeName = getByTestId('pokemon-name');

    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');

    fireEvent.click(buttonNext);
    expect(pokeName).toHaveTextContent('Charmander');

    fireEvent.click(buttonNext);
    expect(pokeName).toHaveTextContent('Caterpie');
  });

  it('Clicking on the last Pokémon, the first Pokémon should be shown', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const eight = 8;
    const array = Array(eight).fill(1);
    const buttonNext = getByText('Próximo pokémon');
    const pokeName = getByTestId('pokemon-name');

    array.forEach((item) => {
      console.log(item);
      fireEvent.click(buttonNext);
    });
    expect(pokeName).toHaveTextContent('Dragonair');

    fireEvent.click(buttonNext);
    expect(pokeName).toHaveTextContent('Pikachu');
  });
});

describe('Test if there are the filter buttons', () => {
  it('The text of the button must correspond to the name of the Pokemon type', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const buttonType = getAllByTestId('pokemon-type-button');
    const pokeType = getByTestId('pokemonType');

    fireEvent.click(buttonType[0]);
    expect(buttonType[0]).toHaveTextContent('Electric');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Electric');

    fireEvent.click(buttonType[1]);
    expect(buttonType[1]).toHaveTextContent('Fire');
    expect(pokeType).toHaveTextContent('Fire');
  });
});

describe('Test if there\'s a button to reset the filter', () => {
  it('The button must contain the text: All', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const buttonAll = getByText('All');
    const buttonType = getAllByTestId('pokemon-type-button');
    const buttonNext = getByText('Próximo pokémon');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonType[0]).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();

    fireEvent.click(buttonType[0]);
    expect(buttonNext.disabled).toBe(true);
    fireEvent.click(buttonAll);
    expect(buttonNext.disabled).toBe(false);
  });
});

describe('Test if a filter button is created for each type of Pokemon.', () => {
  it('The filter buttons must be dynamic.', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const seven = 7;
    const pokeType = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const buttonAll = getByText('All');
    const buttonType = getAllByTestId('pokemon-type-button');

    expect(buttonAll).toBeInTheDocument();
    expect(buttonType.length).toBe(seven);
    buttonType.forEach((item, index) => expect(item).toHaveTextContent(pokeType[index]));
  });
});

describe('The next button is disabled when there is only one filtered Pokemon', () => {
  it('The next button is disabled when clicking the Electric button', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const buttonType = getAllByTestId('pokemon-type-button');
    const buttonNext = getByText('Próximo pokémon');

    expect(buttonNext).toBeInTheDocument();
    fireEvent.click(buttonType[0]);
    expect(buttonNext.disabled).toBe(true);

    fireEvent.click(buttonType[1]);
    expect(buttonNext.disabled).toBe(false);
  });
});
