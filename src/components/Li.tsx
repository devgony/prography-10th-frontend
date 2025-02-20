interface Props {
  name: string;
  label: string;
  value: string;
  defaultChecked: boolean;
}
export default function Li({ name, label, value, defaultChecked }: Props) {
  return (
    <li>
      <label className="flex items-center gap-2 rounded-lg border border-gray-300 p-3 hover:cursor-pointer">
        <input
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
        />
        {label}
      </label>
    </li>
  );
}
