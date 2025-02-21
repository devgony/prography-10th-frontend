import Three from "../components/apply/Three";
import { FieldErrors, RoleErrors } from "../pages/Apply";
import { ApplyActionType, applyReducer } from "../providers/ApplyProvider";
import { roleSchema } from "../schemas/formSchema";
import { ApplyHandler } from "./ApplyHandler";

export default class ThreeHandler extends ApplyHandler {
  renderContent(fieldErrors: FieldErrors) {
    return Three({ fieldErrors: fieldErrors as RoleErrors });
  }

  handleSubmit = async (_: unknown, data: FormData) => {
    const roleResult = roleSchema.safeParse({
      role: data.get("role"),
    });

    if (!roleResult.success) {
      return roleResult.error.flatten();
    }

    const action = {
      type: ApplyActionType.UPDATE_ROLE,
      payload: roleResult.data.role,
    } as const;
    this.dispatch(action);

    const { form: updatedForm } = applyReducer(
      { progress: this.progress, form: this.form },
      action,
    );
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedForm),
      });

      alert(
        `리쿠팅 폼 데이터 API
요청: ${JSON.stringify(updatedForm)}
상태:  ${response.status},
응답: ${JSON.stringify(await response.json())}`,
      );
    } catch {
      alert("서버에 연결할 수 없습니다. 네트워크를 확인해주세요");
    }
    this.navigate("/complete");
  };
}
