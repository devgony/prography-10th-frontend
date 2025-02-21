import { JSX } from "react";
import { FieldErrors } from "../pages/Apply";
import { ApplyAction, IForm, Progress } from "../providers/ApplyProvider";
import { typeToFlattenedError } from "zod";
import { NavigateFunction } from "react-router";

export abstract class ApplyHandler {
  progress: Progress;
  form: IForm;
  dispatch: React.Dispatch<ApplyAction>;
  navigate: NavigateFunction;

  constructor(
    progress: Progress,
    form: IForm,
    dispatch: React.Dispatch<ApplyAction>,
    navigate: NavigateFunction,
  ) {
    this.progress = progress;
    this.form = form;
    this.dispatch = dispatch;
    this.navigate = navigate;
  }

  abstract renderContent(fieldErrors: FieldErrors): JSX.Element;
  abstract handleSubmit(
    _: unknown,
    data: FormData,
  ): Promise<
    | typeToFlattenedError<
        {
          consent: "true";
        },
        string
      >
    | typeToFlattenedError<
        {
          name: string;
          email: string;
          phone: string;
        },
        string
      >
    | typeToFlattenedError<
        {
          role: string;
        },
        string
      >
    | undefined
  >;
}
