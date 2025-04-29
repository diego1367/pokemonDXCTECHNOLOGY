interface Props {
  ability: { name: string; effect: string } | null;
  onClose: () => void;
}

export const HabilidadModal = ({ ability, onClose }: Props) => {
  if (!ability) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold capitalize text-blue-600">
          {ability.name}
        </h2>

        <p className="text-gray-700">{ability.effect}</p>

        <button
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
