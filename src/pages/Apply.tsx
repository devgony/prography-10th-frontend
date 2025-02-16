import { useActionState, useCallback, useContext } from "react";
import Header from "../layouts/Header";
import One from "../components/apply/One";
import Two from "../components/apply/Two";
import Three from "../components/apply/Three";
import Bottom from "../layouts/Bottom";
import ApplyProvider, {
  ApplyContext,
  Progress,
} from "../providers/ApplyProvider";

export default function Apply() {
  const {
    state: { progress, form },
    dispatch,
  } = useContext(ApplyContext);

  console.log(form);

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

  const handleSubmit = (prev: any, data: FormData) => {
    switch (progress) {
      case Progress.One:
        const agreed = data.get("agreed") === "true";
        dispatch({ type: "UPDATE_AGREED", payload: agreed });
    }
  };
  const [state, action] = useActionState(handleSubmit, null);

  return (
    <form action={action} className="flex flex-col justify-around gap-5">
      <section className="rounded-lg bg-white p-6 text-center text-2xl font-extrabold">
        <h1>Prography 10기 지원서</h1>
      </section>
      <Header />
      {renderContent(progress)}
      <Bottom />
    </form>
  );
}
