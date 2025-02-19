interface Props {
  progress: number;
  limit: number;
}

export default function Hr({ progress, limit }: Props) {
  return (
    <hr
      className={`w-full border-y-2 ${progress <= limit ? "border-gray-200" : "border-blue-500"}`}
    />
  );
}
