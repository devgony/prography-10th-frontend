import Two from "../components/apply/Two";
import { FieldErrors, PersonalErrors } from "../pages/Apply";
import { ApplyActionType } from "../providers/ApplyProvider";
import { personalSchema } from "../schemas/formSchema";
import animatedNavigate from "../utils/animatedNavigate";
import { ApplyHandler } from "./ApplyHandler";

export default class TwoHandler extends ApplyHandler {
  renderContent(fieldErrors: FieldErrors) {
    return Two({ fieldErrors: fieldErrors as PersonalErrors });
  }

  handleSubmit = async (_: unknown, data: FormData) => {
    const formData = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      phone: data.get("phone")?.toString() ?? "",
    };

    this.dispatch({
      type: ApplyActionType.UPDATE_PERSONAL,
      payload: formData,
    });

    const { success, error } = personalSchema.safeParse(formData);
    if (!success) {
      return error.flatten();
    }

    animatedNavigate("next", this.progress, this.dispatch);
  };
}
