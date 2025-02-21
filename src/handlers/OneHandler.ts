import One from "../components/apply/One";
import { ConsentErrors, FieldErrors } from "../pages/Apply";
import { ApplyActionType } from "../providers/ApplyProvider";
import { consentSchema } from "../schemas/formSchema";
import animatedNavigate from "../utils/animatedNavigate";
import { ApplyHandler } from "./ApplyHandler";

export default class OneHandler extends ApplyHandler {
  renderContent(fieldErrors: FieldErrors) {
    return One({ fieldErrors: fieldErrors as ConsentErrors });
  }

  handleSubmit = async (_: unknown, data: FormData) => {
    const consent = data.get("consent") as "true" | "false" | undefined;
    const payload = consent && consent === "true";
    this.dispatch({
      type: ApplyActionType.UPDATE_CONSENT,
      payload,
    });

    const { success, error } = consentSchema.safeParse({ consent });
    if (!success) {
      return error.flatten();
    }

    animatedNavigate("next", this.progress, this.dispatch);
  };
}
