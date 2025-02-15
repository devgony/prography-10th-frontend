import { Progress } from "../pages/Apply";

interface Props {
  progress: Progress;
}

export default function Header({ progress }: Props) {
  return (
    <section className="flex justify-around rounded-lg bg-white p-4">
      <h1>{progress}</h1>
    </section>
  );
}
