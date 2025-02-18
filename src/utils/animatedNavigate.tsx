import { flushSync } from "react-dom";
import { ApplyAction, ApplyActionType } from "../providers/ApplyProvider";
import { Dispatch } from "react";

export default function animatedNavigate(
  direction: "next" | "back",
  progress: number,
  dispatch: Dispatch<ApplyAction>,
) {
  const payload = direction === "next" ? progress + 1 : progress - 1;

  document.startViewTransition(() =>
    flushSync(() =>
      dispatch({
        type: ApplyActionType.UPDATE_PROGRESS,
        payload,
      }),
    ),
  );
}
