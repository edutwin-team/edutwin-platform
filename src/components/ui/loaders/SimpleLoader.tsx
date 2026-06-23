export const SimpleLoader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10 gap-3">
      <span className="loading loading-dots loading-md text-primary"></span>

      <p className="text-sm text-base-content/60">Chargement des données...</p>
    </div>
  );
};
