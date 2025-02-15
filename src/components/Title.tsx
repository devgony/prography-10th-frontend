interface Props {
  title: string;
  subtitle: string;
}
export default function Title({ title, subtitle }: Props) {
  return (
    <section>
      <h2 className="mb-3">{title}</h2>
      <hr className="mb-2 border-1 text-blue-500" />
      <p className="mb-4">{subtitle}</p>
    </section>
  );
}
