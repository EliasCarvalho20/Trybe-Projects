import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('check About Page', () => {
  afterEach(cleanup);
  it('renders a heading with the text: About Pokédex', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const heading = getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('check img url', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_'
      + 'Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(url);
  });

  it('check all p tag', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraphs = [/This application simulates a Pokédex, a digital encliclopedia/i,
      /One can filter Pokémons by type, and see more details for each one of them/i];
    const two = 2;
    expect(paragraphs.length).toBe(two);
    paragraphs.forEach((item) => {
      const pElement = getByText(item);
      expect(pElement).toBeInTheDocument();
    });
  });
});
