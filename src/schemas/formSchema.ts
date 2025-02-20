import { z } from "zod";
import { Role } from "../components/apply/Three";

export const consentSchema = z.object({
  consent: z.literal("true", {
    errorMap: () => ({ message: "개인정보 수집에 동의해주세요." }),
  }),
});

export const personalSchema = z.object({
  name: z.string().min(2, "이름은 두 글자 이상이여야 합니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .regex(
      /^((010-?\d{4})|(0\d{1,2}-?\d{3,4}))-?\d{4}$/,
      "올바른 휴대폰 번호 형식이 아닙니다.",
    ),
});

export const roleSchema = z.object({
  role: z.nativeEnum(Role, {
    errorMap: () => ({ message: "역할을 선택해주세요." }),
  }),
});
