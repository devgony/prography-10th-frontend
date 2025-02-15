import Title from "../Title";

export default function One() {
  return (
    <section className="apply-main">
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
          <li>
            <label className="flex gap-2 rounded-lg border border-gray-300 p-3">
              <input type="radio" name="privacy" value="agree" />
              개인정보 수집 여부에 동의합니다
            </label>
          </li>
          <li>
            <label className="flex gap-2 rounded-lg border border-gray-300 p-3">
              <input type="radio" name="privacy" value="disagree" />
              개인정보 수집 여부에 동의하지 않습니다
            </label>
          </li>
        </ul>
      </div>
    </section>
  );
}
