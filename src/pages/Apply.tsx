import { useActionState, useCallback, useContext } from "react";
import Header from "../layouts/Header";
import One from "../components/apply/One";
import Two from "../components/apply/Two";
import Three, { Role } from "../components/apply/Three";
import Bottom from "../layouts/Bottom";
import ApplyProvider, {
  ApplyActionType,
  ApplyContext,
  applyReducer,
  Progress,
} from "../providers/ApplyProvider";
import { useNavigate } from "react-router";

export default function Apply() {
  const {
    state: { progress, form },
    dispatch,
  } = useContext(ApplyContext);
  const navigate = useNavigate();

  console.log("progress", progress);

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
        dispatch({ type: ApplyActionType.UPDATE_AGREED, payload: agreed });
        dispatch({
          type: ApplyActionType.UPDATE_PROGRESS,
          payload: progress + 1,
        });
        break;
      case Progress.Two:
        const name = data.get("name") as string;
        const email = data.get("email") as string;
        const phone = data.get("phone") as string;
        dispatch({
          type: ApplyActionType.UPDATE_PERSONAL,
          payload: { name, email, phone },
        });
        dispatch({
          type: ApplyActionType.UPDATE_PROGRESS,
          payload: progress + 1,
        });
        break;
      case Progress.Three:
        const role = data.get("role") as Role;
        const action = {
          type: ApplyActionType.UPDATE_ROLE,
          payload: role,
        } as const;
        dispatch(action);

        const formDataToSend = applyReducer({ progress, form }, action);
        alert(
          "리쿠팅 폼 데이터 API요청: " + JSON.stringify(formDataToSend.form),
        );
        navigate("/complete");
        break;
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
