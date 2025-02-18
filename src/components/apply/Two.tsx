import { useContext } from "react";
import Title from "../Title";
import { ApplyContext } from "../../providers/ApplyProvider";
import { PersonalErrors } from "../../pages/Apply";

interface Props {
  fieldErrors?: PersonalErrors;
}
export default function Two({ fieldErrors }: Props) {
  const {
    state: {
      form: { name, email, phone },
    },
  } = useContext(ApplyContext);
  return (
    <section className="apply-main flex flex-col gap-3">
      <Title title="기본 정보" subtitle="연락 가능한 정보를 입력해주세요" />

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>성함을 입력해주세요</p>
        <input
          name="name"
          className="w-full rounded-md border border-gray-300 bg-purple-50 py-1 pl-2"
          type="text"
          placeholder="김프로"
          defaultValue={name}
        />
        {fieldErrors?.name?.map((error, index) => (
          <span key={index} className="font-medium text-red-500">
            {error}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>이메일 주소를 입력해주세요</p>
        <input
          name="email"
          className="w-full rounded-md border border-gray-300 bg-purple-50 py-1 pl-2"
          type="text"
          placeholder="예시: prography@gmail.com"
          defaultValue={email}
        />
        {fieldErrors?.email?.map((error, index) => (
          <span key={index} className="font-medium text-red-500">
            {error}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>휴대폰 번호를 입력해주세요</p>
        <input
          name="phone"
          className="w-full rounded-md border border-gray-300 bg-purple-50 py-1 pl-2"
          type="text"
          placeholder="예시: 010-1234-5678"
          defaultValue={phone}
        />
        {fieldErrors?.phone?.map((error, index) => (
          <span key={index} className="font-medium text-red-500">
            {error}
          </span>
        ))}
      </div>
    </section>
  );
}
