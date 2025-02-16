import { Role } from "./apply/Three";

interface Props {
  label: Role;
}
export default function Li({ label }: Props) {
  return (
    <li className="flex gap-2 rounded-lg border border-gray-300 p-3">
      <input type="radio" name="role" value={label} />
      <label>{label}</label>
    </li>
  );
}
