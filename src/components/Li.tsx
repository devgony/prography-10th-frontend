interface Props {
  label: string;
}
export default function Li({ label }: Props) {
  return (
    <li className="flex gap-2 rounded-lg border border-gray-300 p-3">
      <input type="radio" name="privacy" value="agree" />
      <label>{label}</label>
    </li>
  );
}
