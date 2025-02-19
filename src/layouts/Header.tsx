import { useContext } from "react";
import { ApplyContext } from "../providers/ApplyProvider";
import Circle from "../components/Circle";
import Hr from "../components/Hr";

export default function Header() {
  const {
    state: { progress },
  } = useContext(ApplyContext);
  return (
    <section className="flex justify-around rounded-lg bg-white p-4">
      <div className="flex w-5/6 items-center">
        <Circle progress={progress} label={1} />
        <Hr progress={progress} limit={1} />
        <Circle progress={progress} label={2} />
        <Hr progress={progress} limit={2} />
        <Circle progress={progress} label={3} />
      </div>
    </section>
  );
}
