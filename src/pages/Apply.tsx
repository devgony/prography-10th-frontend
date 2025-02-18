import { z } from "zod";
import { useActionState, useContext } from "react";
import Header from "../layouts/Header";
import One from "../components/apply/One";
import Two from "../components/apply/Two";
import Three, { Role } from "../components/apply/Three";
import Bottom from "../layouts/Bottom";
import {
  ApplyActionType,
  ApplyContext,
  applyReducer,
  Progress,
} from "../providers/ApplyProvider";
import { useNavigate } from "react-router";

const consentSchema = z.object({
  consent: z.literal("true", {
    errorMap: () => ({ message: "개인정보 수집에 동의해주세요." }),
  }),
});

const personalSchema = z.object({
  name: z.string().min(2, "이름은 두 글자 이상이여야 합니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .regex(
      /^((010-?\d{4})|(0\d{1,2}-?\d{3,4}))-?\d{4}$/,
      "올바른 휴대폰 번호 형식이 아닙니다.",
    ),
});

const roleSchema = z.object({
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "역할을 선택해주세요." }),
  }),
});

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

type FieldErrors = ConsentErrors | PersonalErrors | RoleErrors | undefined;

export default function Apply() {
  const {
    state: { progress, form },
    dispatch,
  } = useContext(ApplyContext);
  const navigate = useNavigate();

  console.log("progress", form);

  const renderContent = (progress: Progress, fieldErrors: FieldErrors) => {
    switch (progress) {
      case Progress.One:
        return <One fieldErrors={fieldErrors as ConsentErrors} />;
      case Progress.Two:
        return <Two fieldErrors={fieldErrors as PersonalErrors} />;
      case Progress.Three:
        return <Three fieldErrors={fieldErrors as RoleErrors} />;
    }
  };

  const handleSubmit = (prev: any, data: FormData) => {
    switch (progress) {
      case Progress.One: {
        const consent = data.get("consent") as "true" | "false" | undefined;
        const payload = consent && consent === "true";
        dispatch({
          type: ApplyActionType.UPDATE_CONSENT,
          payload,
        });

        const { success, error } = consentSchema.safeParse({ consent });
        if (!success) {
          return error.flatten();
        }

        dispatch({
          type: ApplyActionType.UPDATE_PROGRESS,
          payload: progress + 1,
        });
        return;
      }
      case Progress.Two: {
        const formData = {
          name: data.get("name")?.toString() ?? "",
          email: data.get("email")?.toString() ?? "",
          phone: data.get("phone")?.toString() ?? "",
        };

        dispatch({
          type: ApplyActionType.UPDATE_PERSONAL,
          payload: formData,
        });

        const { success, error } = personalSchema.safeParse(formData);
        if (!success) {
          return error.flatten();
        }

        dispatch({
          type: ApplyActionType.UPDATE_PROGRESS,
          payload: progress + 1,
        });
        break;
      }
      case Progress.Three:
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
      {renderContent(progress, state?.fieldErrors)}
      <Bottom />
    </form>
  );
}
