

export const getPokemons = async (offset = 0, limit = 10): Promise<any> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  return response.json();
};

export const getPokemonName = async (name: string): Promise<any> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
};
export const getHabilidad = async (abilityName: string): Promise<any> => {
  const response = await fetch(`https://pokeapi.co/api/v2/ability/${abilityName}`);
  if (!response.ok) {
    throw new Error('Error fetching ability details');
  }
  return response.json();
};