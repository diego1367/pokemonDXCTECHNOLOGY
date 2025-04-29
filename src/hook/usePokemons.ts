import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../services/pokemonServices";

export const usePokemons = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["pokemons", page, limit],
    queryFn: () => getPokemons((page - 1) * limit, limit)
  });
};
