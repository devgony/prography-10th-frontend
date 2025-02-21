import { useActionState, useContext } from "react";
import Header from "../layouts/Header";
import Bottom from "../layouts/Bottom";
import { ApplyContext } from "../providers/ApplyProvider";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import createApplyHandler from "../handlers/createApplyHandler";

export type ConsentErrors = {
  consent?: string[] | undefined;
};

export type PersonalErrors = {
  name?: string[] | undefined;
  email?: string[] | undefined;
  phone?: string[] | undefined;
};

export type RoleErrors = {
  role?: string[] | undefined;
};

export type FieldErrors =
  | ConsentErrors
  | PersonalErrors
  | RoleErrors
  | undefined;

export default function Apply() {
  const {
    state: { progress, form },
    dispatch,
  } = useContext(ApplyContext);
  const navigate = useNavigate();

  const applyHandler = createApplyHandler(progress, form, dispatch, navigate);
  const [state, action] = useActionState(applyHandler.handleSubmit, null);

  return (
    <>
      <Helmet>
        <title>Prography 10기 모집 | 지원하기</title>
      </Helmet>
      <form action={action} className="flex flex-col justify-around gap-5">
        <section className="rounded-lg bg-white p-6 text-center text-2xl font-extrabold">
          <h1>Prography 10기 지원서</h1>
        </section>
        <Header />
        {applyHandler.renderContent(state?.fieldErrors)}
        <Bottom />
      </form>
    </>
  );
}
