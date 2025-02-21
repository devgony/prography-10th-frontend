import { NavigateFunction } from "react-router";
import { ApplyAction, IForm, Progress } from "../providers/ApplyProvider";
import { ApplyHandler } from "./ApplyHandler";
import OneHandler from "./OneHandler";
import ThreeHandler from "./ThreeHandler";
import TwoHandler from "./TwoHandler";

export default function createApplyHandler(
  progress: Progress,
  form: IForm,
  dispatch: React.Dispatch<ApplyAction>,
  navigate: NavigateFunction,
): ApplyHandler {
  const handlers = {
    [Progress.One]: OneHandler,
    [Progress.Two]: TwoHandler,
    [Progress.Three]: ThreeHandler,
  };

  const Handler = handlers[progress];
  return new Handler(progress, form, dispatch, navigate);
}
