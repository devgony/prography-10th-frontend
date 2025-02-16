import { useContext } from "react";
import { ApplyContext } from "../providers/ApplyProvider";

export default function Header() {
  const {
    state: { progress },
  } = useContext(ApplyContext);
  return (
    <section className="flex justify-around rounded-lg bg-white p-4">
      <h1>{progress}</h1>
    </section>
  );
}
