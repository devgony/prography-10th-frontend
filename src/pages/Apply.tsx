import { useState } from "react";
import Header from "../layouts/Header";
import One from "../components/apply/One";
import Two from "../components/apply/Two";
import Three from "../components/apply/Three";
import Bottom from "../layouts/Bottom";

export enum Progress {
  One = 1,
  Two = 2,
  Three = 3,
}

export default function Apply() {
  const [progress, setProgress] = useState<Progress>(Progress.One);
  const renderContent = (progress: Progress) => {
    switch (progress) {
      case Progress.One:
        return <One />;
      case Progress.Two:
        return <Two />;
      case Progress.Three:
        return <Three />;
    }
  };
  return (
    <main className="flex flex-col justify-around gap-5">
      <section className="rounded-lg bg-white p-8 text-center text-2xl font-extrabold">
        <h1>Prography 10기 지원서</h1>
      </section>
      <Header progress={progress} />
      {renderContent(progress)}
      <Bottom setProgress={setProgress} />
    </main>
  );
}
