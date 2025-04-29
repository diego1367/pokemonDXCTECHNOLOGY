import { useState } from "react";
import { PokemonDetail } from "../models/pokemonHabilidades";
import { getHabilidad } from "../services/pokemonServices";

interface Props {
  pokemon: PokemonDetail | null;
  onClose: () => void;
}

export const DetallePokemon = ({ pokemon, onClose }: Props) => {
  const [selectedAbility, setSelectedAbility] = useState<{
    name: string;
    effect: string;
  } | null>(null);
  const handleAbilityClick = (abilityName: string) => {
    getHabilidad(abilityName)
      .then((data) => {
        const effectEntry = data.effect_entries.find(
          (e: any) => e.language.name === "en"
        );
        setSelectedAbility({
          name: abilityName,
          effect: effectEntry
            ? effectEntry.effect
            : "Sin descripción disponible.",
        });
      })
      .catch(() => {
        alert("No se pudo cargar la habilidad");
      });
  };

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6 text-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <h2 className="text-3xl font-bold capitalize text-blue-600">
          {pokemon.name}
        </h2>
        <p>
          <strong>Tipo:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <p>
          <strong>Peso:</strong> {pokemon.weight} kg
        </p>
        <div>
          <strong>Habilidades:</strong>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((a, idx) => (
              <li
                key={idx}
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => handleAbilityClick(a.ability.name)}
              >
                {a.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
      {selectedAbility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-bold capitalize text-blue-600">
              {selectedAbility.name}
            </h2>
            <p className="text-gray-700">{selectedAbility.effect}</p>
            <button
              className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
              onClick={() => setSelectedAbility(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
