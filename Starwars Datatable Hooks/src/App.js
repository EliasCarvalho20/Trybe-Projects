import React from 'react';

import './App.css';
import Table from './pages/Table';
import { FilterByName, FilterByNumber, FilterByOrder, Filters } from './components';
import { StarWarsProvider } from './context';

function App() {
  return (
    <StarWarsProvider>
      <FilterByName />
      <FilterByNumber />
      <FilterByOrder />
      <Filters />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
