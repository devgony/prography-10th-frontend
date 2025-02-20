interface Props {
  progress: number;
  label: number;
}

export default function Circle({ progress, label }: Props) {
  return (
    <span
      className={`circle ${label <= progress ? "bg-blue-500 text-white" : "bg-gray-200"} ${label === progress ? "animate-bounce" : ""}`}
    >
      {label}
    </span>
  );
}
