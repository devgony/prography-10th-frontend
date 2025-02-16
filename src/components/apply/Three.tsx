import Li from "../Li";
import Title from "../Title";

export enum Role {
  Frontend = "프론트엔드",
  Backend = "백엔드",
  Design = "디자인",
  iOS = "iOS",
  Android = "안드로이드",
  ProductOwner = "Product Owner",
}

export default function Three() {
  return (
    <section className="apply-main">
      <Title title="지원정보" subtitle="지원하고자 하는 분야를 선택해주세요" />

      <div className="flex flex-col gap-2 rounded-lg border border-gray-300 p-3">
        <p>지원 분야를 선택해주세요</p>

        <ul className="flex flex-col gap-2">
          {Object.values(Role).map((label) => (
            <Li key={label} label={label} />
          ))}
        </ul>
      </div>
    </section>
  );
}
