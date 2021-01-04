export default async function getPlanets() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const planetResponse = await fetch(endpoint);
  return planetResponse.json();
}
