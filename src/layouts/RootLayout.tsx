import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="h-screen bg-gray-200 p-4">
      <Outlet />
    </div>
  );
}
