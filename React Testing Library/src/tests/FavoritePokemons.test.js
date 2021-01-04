import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('check Favorite Pokemons', () => {
  it('renders the Favorite Page when there\'s no favorite Pokemon', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const notFoundText = getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('renders the Favorite Page when there are one or more favorite Pokemons', () => {
    const favoritePokemons = pokemons.filter(({ name }) => name === 'Pikachu');

    const { getByTestId, getByText, getAllByText, history } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );

    const details = getAllByText(/More details/i);
    expect(details.length).toBe(1);

    const heading = getByText('Favorite pokémons');
    expect(heading).toBeInTheDocument();

    fireEvent.click(details[0]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const pokenonName = getByTestId('pokemon-name');
    expect(pokenonName).toBeInTheDocument();
    expect(pokenonName).toHaveTextContent('Pikachu');
  });

  it('check if only the Favorite Pokemon is being rendered', () => {
    const pokemonNames = ['Pikachu', 'Charmander'];
    const two = 2;
    const favoritePokemons = pokemons.filter(({ name }) => pokemonNames.includes(name));

    const { getAllByTestId, getAllByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePokemons } />,
    );
    const details = getAllByText(/More details/i);
    expect(details.length).toBe(two);

    const pokenonName = getAllByTestId('pokemon-name');
    expect(pokenonName.length).toBe(two);
    pokenonName.forEach((item, index) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(pokemonNames[index]);
    });
  });
});
