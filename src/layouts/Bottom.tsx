import { useContext } from "react";
import { useNavigate } from "react-router";
import { ApplyContext } from "../providers/ApplyProvider";

export default function Bottom() {
  const navigate = useNavigate();
  const {
    state: { progress },
    dispatch,
  } = useContext(ApplyContext);
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

          dispatch({ type: "UPDATE_PROGRESS", payload: progress + 1 });
        }}
      >
        {progress === 3 ? "제출하기" : "다음"}
      </button>
    </section>
  );
}
