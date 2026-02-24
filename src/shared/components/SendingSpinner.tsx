export const SendingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-full w-full text-gray-600">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-[#82385D] rounded-full animate-spin"></div>
    <p className="mt-3 text-sm font-medium text-[#82385D]">Enviando datos...</p>
  </div>
);
