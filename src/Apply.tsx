import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function Apply() {
  const navigate = useNavigate();
  return (
    <main className="flex h-full flex-col justify-around">
      <section className="rounded-lg bg-white p-8 text-center text-2xl font-extrabold">
        <h1>Prography 10기 지원서</h1>
      </section>
      <section className="flex justify-around rounded-lg bg-white p-4">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </section>
      <section className="rounded-lg bg-white p-6">
        <h2 className="mb-3">개인정보 수집 동의</h2>
        <hr className="mb-2 border-1 text-blue-500" />
        <p className="mb-4">
          프로그라피 10기 지원을 위한 개인정보 수집에 대한 동의가 필요합니다
        </p>

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

      <section className="flex justify-between rounded-lg bg-white p-6">
        <button
          className="rounded-md bg-gray-200 px-4 py-1 hover:bg-blue-500"
          onClick={() => navigate(-1)}
        >
          뒤로
        </button>
        <Link
          to="/apply2" // TODO: change this to state
          className="rounded-md bg-blue-500 px-4 py-1 text-white"
        >
          다음
        </Link>
      </section>
    </main>
  );
}
