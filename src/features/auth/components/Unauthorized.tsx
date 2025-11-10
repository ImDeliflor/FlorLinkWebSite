import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-2xl font-bold text-[#82385D]">401</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-[#E8B7BA] sm:text-7xl">
          Página no autorizada
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Lo sentimos, pero no tienes autorización para entrar a esta página.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-[#82385D] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#82385D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};
