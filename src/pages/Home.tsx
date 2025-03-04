import { Link } from "react-router";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Prography 10기 모집 | HOME</title>
      </Helmet>
      <main className="flex h-[calc(100vh-2rem)] flex-col items-center justify-around rounded-lg bg-white p-8">
        <img src="/prography.png" alt="prography-logo" />
        <h1 className="text-xl font-bold">
          안녕하세요. 새로운 가치를 만들어가는 IT커뮤니티, Prography 입니다.
        </h1>
        <h2 className="font-bold text-blue-500">
          드디어 Prography 10기모집이 시작되었습니다.
        </h2>
        <section className="text-center">
          <p>
            Product Owner / Design / iOS / AOS / Frontend(React) /
            Backend(Spring)
          </p>
          <p>총 6개의 파트를 모집합니다.</p>
        </section>
        <section className="text-center">
          <p>✓ 새로운 가치를 만들어내는데 가슴이 두근거리신다면,</p>
          <p>✓ 열정적인 IT인들과 함께 사이드 프로젝트를 하고 싶으시다면,</p>
          <p>✓ 탁월한 동료들과 짜릿한 성취감을 느껴보고 싶으시다면,</p>
        </section>
        <section className="text-center">
          <h2 className="font-extrabold text-blue-500">"프로답게, 재미있게"</h2>
          <p>재미있는 작당을 함께 만들어갈 10기에 합류하세요.</p>
        </section>
        <section className="flex flex-col items-center">
          <p className="mb-4">
            📌 자세한 정보는 아래 페이지에 담아뒀으니, 지원 전 꼭 확인해주세요👇
          </p>
          <a
            className="text-blue-500 hover:underline"
            href="https://prography-admin.notion.site/apply-prography10"
          >
            프로그라피 10기 모집 자세히 알아보기
          </a>
          <a
            className="text-blue-500 hover:underline"
            href="https://prography.org/"
          >
            🏡 공식 홈페이지
          </a>
          <a
            className="text-blue-500 hover:underline"
            href="https://www.instagram.com/prography_official/"
          >
            🔗 인스타그램
          </a>
        </section>
        <Link
          to="/apply"
          className="animate-pulse rounded-md bg-blue-500 px-6 py-2 text-white hover:animate-none"
          viewTransition
        >
          지원하기
        </Link>
      </main>
    </>
  );
}
