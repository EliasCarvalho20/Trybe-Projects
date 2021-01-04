import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Test if the information of a certain pokemon.', () => {
  it('Test the name of the pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');
  });

  it('Test the weight of the pokemon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent('Average weight:6.0 kg');
  });

  it('Test the img of the pokemon', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const url = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokeImg = getByAltText(/Pikachu sprite/i);
    expect(pokeImg).toBeInTheDocument();
    expect(pokeImg.src).toBe(url);
  });
});

describe('Test if the card has a url for the pokemon.', () => {
  it('Test the Link with id', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink.href).toBe('http://localhost/pokemons/25');

    fireEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Test the favorite pokemon', () => {
    const { getByAltText, getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,
    );
    const detailsLink = getByText(/More details/i);
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);

    const favImg = getByAltText(/Pikachu is marked as favorite/i);
    expect(favImg).toBeInTheDocument();
    expect(favImg.src).toBe('http://localhost/star-icon.svg');
  });
});
