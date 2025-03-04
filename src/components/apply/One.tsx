import { useContext } from "react";
import Title from "../Title";
import { ApplyContext } from "../../providers/ApplyProvider";
import { ConsentErrors } from "../../pages/Apply";
import Li from "../Li";

interface Props {
  fieldErrors?: ConsentErrors;
}
export default function One({ fieldErrors }: Props) {
  const {
    state: {
      form: { consent },
    },
  } = useContext(ApplyContext);
  return (
    <section className="apply-main view-apply-form">
      <Title
        title="개인정보 수집 동의"
        subtitle="프로그라피 10기 지원을 위한 개인정보 수집에 대한 동의가 필요합니다"
      />

      <div className="rounded-lg border border-gray-300 p-6">
        <p>수집 목적: Prography 10기 리쿠르팅 과정 및 결과 안내</p>
        <p>수집 항목: 이름, 이메일, 핸드폰번호, 학교 정보 및 직장 정보</p>
        <p className="mb-3">
          보유 및 이용 기간: 리쿠르팅 과정 종료일(3월 7일) 이후 파기
        </p>

        <div className="flex gap-1">
          <p className="mb-1">개인정보 수집여부 동의 여부를 체크해주세요.</p>
          <p className="text-red-600">*</p>
        </div>
        <ul className="flex flex-col gap-2">
          <Li
            name="consent"
            label="개인정보 수집 여부에 동의합니다"
            value="true"
            defaultChecked={consent === true}
          />
          <Li
            name="consent"
            label="개인정보 수집 여부에 동의하지 않습니다"
            value="false"
            defaultChecked={consent === false}
          />
        </ul>
        {fieldErrors?.consent?.map((error, index) => (
          <span key={index} className="font-medium text-red-500">
            {error}
          </span>
        ))}
      </div>
    </section>
  );
}
