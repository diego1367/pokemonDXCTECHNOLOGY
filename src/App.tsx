import { useState } from "react";
import { usePokemons } from "./hook/usePokemons";
import { PokemonTable } from "./components/tablapokemon";
import { DetallePokemon } from "./components/detallepokemon";
import { PokemonDetail } from "./models/pokemonHabilidades";
import { getPokemonName } from "./services/pokemonServices";

function App() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, isLoading, isError, refetch } = usePokemons(page, limit);
  const [search, setSearch] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonDetail | null>(
    null
  );

  const handleSearch = () => {
    if (search.trim() !== "") {
      getPokemonName(search.toLowerCase())
        .then((data) => {
          setSearchedPokemon(data);
          setPage(1);
        })
        .catch(() => {
          alert("Pokémon no encontrado");
          setSearchedPokemon(null);
        });
    }
  };
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );

  const handleSelect = (pokemonName: string) => {
    getPokemonName(pokemonName).then((data) => {
      setSelectedPokemon(data);
    });
  };
  if (isLoading)
    return <p className="text-center mt-10 text-lg">Cargando pokemones...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-lg text-red-600">
        Error cargando pokemones
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-full min-h-screen bg-white rounded-2xl shadow-2xl p-10 space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-600">
          Pokédex React
        </h1>

        <div className="flex justify-between items-center gap-4 flex-wrap">
          {/* Select de mostrar */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Mostrar:
            </label>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1);
                refetch();
              }}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>

          {/* Input de buscar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
        <PokemonTable
          pokemons={
            searchedPokemon
              ? [
                  {
                    name: searchedPokemon.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${searchedPokemon.id}/`,
                  },
                ]
              : data?.results ?? []
          }
          onSelect={handleSelect}
        />
        {selectedPokemon && (
          <DetallePokemon
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
        <div className="flex justify-between items-center pt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </button>
          <span className="text-sm font-semibold text-gray-700">
            Página {page}
          </span>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
