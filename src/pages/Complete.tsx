import { Helmet } from "react-helmet";
import { Link } from "react-router";

export default function Complete() {
  return (
    <>
      <Helmet>
        <title>Prography 10기 모집 | 제출완료</title>
      </Helmet>
      <main className="flex flex-col justify-around gap-5">
        <section className="rounded-lg bg-white p-6 text-center text-2xl font-extrabold">
          <h1>Prography 10기 지원서</h1>
        </section>
        <section className="apply-main flex flex-col items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-500 text-white">
            ✓
          </div>
          <h1 className="text-xl">지원이 완료되었습니다.</h1>
          <div className="text-center">
            <p>프로그라피 10기 지원해주셔서 감사합니다.</p>
            <p>서류 심사 결과는 입력하신 이메일로 안내드릴 예정입니다.</p>
          </div>
          <Link
            to="/"
            className="rounded-md bg-blue-500 px-6 py-2 text-center text-white"
          >
            홈으로 돌아가기
          </Link>
        </section>
      </main>
    </>
  );
}
