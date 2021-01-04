import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('renders the component App', () => {
  it('check the Home\'s url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Home/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('renders a heading with the text: Pokédex', () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
});

describe('renders the About page', () => {
  it('check the About\'s url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('renders a heading with the text: About Pokédex', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/About/i));
    const aboutHeading = getByText(/About Pokédex/);
    expect(aboutHeading).toBeInTheDocument();
  });
});

describe('renders the Favorites page', () => {
  it('check the Favorites\'s url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('renders a heading with the text: Favorite pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    const aboutHeading = getByText(/Favorite pokémons/);
    expect(aboutHeading).toBeInTheDocument();
  });
});

describe('renders the NotFound page', () => {
  it('check the NotFound\'s url', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/i-have-no-clue');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
