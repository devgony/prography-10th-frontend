import { useNavigate } from "react-router";
import { Progress } from "../pages/Apply";
import React from "react";

interface Props {
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
}

export default function Bottom({ progress, setProgress }: Props) {
  const navigate = useNavigate();
  return (
    <section className="flex w-full justify-between rounded-lg bg-white p-6">
      <button
        className="rounded-md bg-gray-200 px-4 py-1 hover:bg-blue-500"
        onClick={() => navigate(-1)}
      >
        뒤로
      </button>
      <button
        className="rounded-md bg-blue-500 px-4 py-1 text-white"
        onClick={() => {
          if (progress >= 3) {
            navigate("/complete");
          }

          setProgress((prev) => prev + 1);
        }}
      >
        {progress === 3 ? "제출하기" : "다음"}
      </button>
    </section>
  );
}
