import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-gray-200 p-4">
      <Outlet />
    </div>
  );
}
