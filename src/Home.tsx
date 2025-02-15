export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-around rounded-lg bg-white p-8">
      <img src="/prography.png" alt="prography-logo" />
      <h1 className="text-xl font-bold">
        안녕하세요. 새로운 가치를 만들어가는 IT커뮤니티, Prography 입니다.
      </h1>
      <h2 className="font-bold text-blue-500">
        드디어 Prography 10기모집이 시작되었습니다.
      </h2>
      <section className="text-center">
        <p>
          Product Owner / Design / iOS / AOS / Frontend(React) / Backend(Spring)
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
      <section className="text-center">
        <p className="mb-4">
          📌 자세한 정보는 아래 페이지에 담아뒀으니, 지원 전 꼭 확인해주세요👇
        </p>
        <p className="text-blue-500">프로그라피 10기 모집 자세히 알아보기</p>
        <p className="text-blue-500">🏡 공식 홈페이지</p>
        <p className="text-blue-500">🔗 인스타그램</p>
      </section>
      <button className="rounded-md bg-blue-500 px-6 py-2 text-white">
        지원하기
      </button>
    </main>
  );
}
