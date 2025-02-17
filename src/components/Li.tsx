import { Role } from "./apply/Three";

interface Props {
  label: Role;
  defaultChecked: boolean;
}
export default function Li({ label, defaultChecked }: Props) {
  return (
    <li className="flex gap-2 rounded-lg border border-gray-300 p-3">
      <input
        type="radio"
        name="role"
        value={label}
        defaultChecked={defaultChecked}
      />
      <label>{label}</label>
    </li>
  );
}
