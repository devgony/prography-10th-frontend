import { useNavigate } from "react-router";
import { Progress } from "./Apply";
import React from "react";

interface Props {
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
}

export default function Bottom({ setProgress }: Props) {
  const navigate = useNavigate();
  return (
    <section className="flex justify-between rounded-lg bg-white p-6">
      <button
        className="rounded-md bg-gray-200 px-4 py-1 hover:bg-blue-500"
        onClick={() => navigate(-1)}
      >
        뒤로
      </button>
      <button
        className="rounded-md bg-blue-500 px-4 py-1 text-white"
        onClick={() => setProgress((prev) => (prev === 3 ? 1 : prev + 1))}
      >
        다음
      </button>
    </section>
  );
}
