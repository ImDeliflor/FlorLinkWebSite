interface EmptyDataProps {
  message: string;
}

export const EmptyData = ({
  message = "No hay datos por mostrar",
}: EmptyDataProps) => {
  return (
    <div
      className="flex items-start sm:items-center w-auto p-4 mb-4 bg-[#1e2939] text-sm text-fg-danger-strong rounded-xl bg-danger-soft"
      role="alert"
    >
      <svg
        className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0 text-[#ffff]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p className="text-[#ffff]">
        <span className="font-medium me-1">{message}</span>
      </p>
    </div>
  );
};
