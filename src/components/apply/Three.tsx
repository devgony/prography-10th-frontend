import { useContext } from "react";
import Li from "../Li";
import Title from "../Title";
import { ApplyContext } from "../../providers/ApplyProvider";
import { RoleErrors } from "../../pages/Apply";

interface Props {
  fieldErrors?: RoleErrors;
}
export enum Role {
  Frontend = "프론트엔드",
  Backend = "백엔드",
  Design = "디자인",
  iOS = "iOS",
  Android = "안드로이드",
  ProductOwner = "Product Owner",
}

export default function Three({ fieldErrors }: Props) {
  const {
    state: {
      form: { role },
    },
  } = useContext(ApplyContext);
  return (
    <section className="apply-main">
      <Title title="지원정보" subtitle="지원하고자 하는 분야를 선택해주세요" />

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>지원 분야를 선택해주세요</p>

        <ul className="flex flex-col gap-2">
          {Object.values(Role).map((label) => (
            <Li key={label} label={label} defaultChecked={label === role} />
          ))}
        </ul>
      </div>
      {fieldErrors?.role?.map((error, index) => (
        <span key={index} className="font-medium text-red-500">
          {error}
        </span>
      ))}
    </section>
  );
}
