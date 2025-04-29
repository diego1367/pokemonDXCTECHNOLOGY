interface Props {
  pokemons: { name: string; url: string }[];
  onSelect: (name: string) => void;
}

export const PokemonTable = ({ pokemons, onSelect }: Props) => {
  return (
    <table className="w-full text-sm text-left text-gray-800 bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="text-xs text-white uppercase bg-blue-600">
        <tr>
          <th className="px-6 py-3 text-center">#</th>
          <th className="px-6 py-3 text-center">Imagen</th>
          <th className="px-6 py-3">Nombre</th>
        </tr>
      </thead>
      <tbody>
        {pokemons.map((pokemon) => (
          <tr
            key={pokemon.name}
            className="hover:bg-blue-50 transition-colors duration-200 border-b"
          >
            <td className="px-6 py-4 text-center font-semibold">
              {extractId(pokemon.url)}
            </td>
            <td className="px-6 py-4 text-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractId(
                  pokemon.url
                )}.png`}
                alt={pokemon.name}
                className="w-14 h-14 mx-auto cursor-pointer hover:scale-110 transition-transform duration-200"
                onDoubleClick={() => onSelect(pokemon.name)}
              />
            </td>
            <td className="px-6 py-4 capitalize font-medium">{pokemon.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function extractId(url: string) {
  const match = url.match(/\/pokemon\/(\d+)\//);
  return match ? match[1] : "";
}
