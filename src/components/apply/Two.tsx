import Title from "../Title";

export default function Two() {
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
        />
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>이메일 주소를 입력해주세요</p>
        <input
          name="email"
          className="w-full rounded-md border border-gray-300 bg-purple-50 py-1 pl-2"
          type="text"
          placeholder="예시: prography@gmail.com"
        />
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>휴대폰 번호를 입력해주세요</p>
        <input
          name="phone"
          className="w-full rounded-md border border-gray-300 bg-purple-50 py-1 pl-2"
          type="text"
          placeholder="예시: 010-1234-5678"
        />
      </div>
    </section>
  );
}
