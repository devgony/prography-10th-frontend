import { flushSync } from "react-dom";
import { ApplyAction, ApplyActionType } from "../providers/ApplyProvider";
import { Dispatch } from "react";

export default function animatedNavigate(
  direction: "next" | "back",
  progress: number,
  dispatch: Dispatch<ApplyAction>,
) {
  const payload = direction === "next" ? progress + 1 : progress - 1;

  const style = document.createElement("style");
  style.id = "view-transition-style";
  style.innerHTML = `
::view-transition-old(view-apply-form) {
  animation: ${direction}SlideOut 1s;
}
::view-transition-new(view-apply-form) {
animation: ${direction}SlideIn 1s;
}
`;

  document.head.appendChild(style);

  document.startViewTransition(() =>
    flushSync(() =>
      dispatch({
        type: ApplyActionType.UPDATE_PROGRESS,
        payload,
      }),
    ),
  );
}
