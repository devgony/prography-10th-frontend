import { useContext } from "react";
import { useNavigate } from "react-router";
import { ApplyContext } from "../providers/ApplyProvider";
import animatedNavigate from "../utils/animatedNavigate";

export default function Bottom() {
  const navigate = useNavigate();
  const {
    state: { progress },
    dispatch,
  } = useContext(ApplyContext);

  const handleBack = () => {
    if (progress === 1) {
      navigate(-1);
      return;
    }

    animatedNavigate("back", progress, dispatch);
  };
  return (
    <section className="flex w-full justify-between rounded-lg bg-white p-6">
      <button
        type="button"
        className="rounded-md bg-gray-200 px-4 py-1 hover:cursor-pointer hover:bg-blue-500"
        onClick={handleBack}
      >
        뒤로
      </button>
      <button
        type="submit"
        className="animate-pulse rounded-md bg-blue-500 px-4 py-1 text-white hover:animate-none hover:cursor-pointer"
      >
        {progress === 3 ? "제출하기" : "다음"}
      </button>
    </section>
  );
}
