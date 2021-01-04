import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokemon\'s detailed information.', () => {
  it('Test the name and info of the pokemon', () => {
    const {
      queryByText,
      getAllByRole,
      history } = renderWithRouter(<App />);

    const pokeName = pokemons[0].name;
    fireEvent.click(queryByText(/More details/i));

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const heading = getAllByRole('heading');
    expect(heading[1]).toBeInTheDocument();
    expect(heading[1]).toHaveTextContent(`${pokeName} Details`);

    expect(queryByText('More details')).not.toBeInTheDocument();

    expect(heading[2]).toBeInTheDocument();
    expect(heading[2]).toHaveTextContent('Summary');

    const pokeInfo = queryByText(/This intelligent/i);
    expect(pokeInfo).toBeInTheDocument();
  });
});

describe('Test if there is a section on the page with the maps.', () => {
  it('Test the location section', () => {
    const {
      queryByText,
      queryAllByAltText,
      getAllByRole,
      history } = renderWithRouter(<App />);

    const pokeName = pokemons[0].name;
    const location = pokemons[0].foundAt;
    fireEvent.click(queryByText(/More details/i));

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const heading = getAllByRole('heading');
    expect(heading[3]).toBeInTheDocument();
    expect(heading[3]).toHaveTextContent(`Game Locations of ${pokeName}`);

    const pokeLocation = queryAllByAltText('Pikachu location');
    expect(pokeLocation.length).toBe(location.length);
    pokeLocation.forEach((item, index) => {
      expect(item).toBeInTheDocument();
      expect(item.src).toBe(location[index].map);
    });
  });
});

describe('Test if you can favorite a pokémon through the details page.', () => {
  it('Test the favorite input', () => {
    const pokeName = pokemons[0].name;
    const {
      queryByText,
      getByLabelText,
      getByAltText,
      history } = renderWithRouter(<App />);

    fireEvent.click(queryByText(/More details/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');

    const favInput = getByLabelText(/Pokémon favoritado?/i);
    expect(favInput).toBeInTheDocument();
    expect(favInput.checked).toBe(false);

    fireEvent.click(favInput);
    expect(favInput.checked).toBe(true);

    const pokeFav = getByAltText(`${pokeName} is marked as favorite`);
    expect(pokeFav).toBeInTheDocument();

    fireEvent.click(favInput);
    expect(pokeFav).not.toBeInTheDocument();
    expect(favInput.checked).toBe(false);
  });
});
